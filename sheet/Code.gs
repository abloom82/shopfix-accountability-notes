/* ====================================================================
   ACCOUNTABILITY NOTES → GOOGLE SHEET (for Coach Sam and Jazmin)
   Every goal a shop owner saves, and every "I did it today" they tap,
   lands here as a row. The Dashboard tab adds it all up.

   Tabs this makes (run setup() once):
     Dashboard  tribe totals + top owners + wins per day (chart)
     Goals      one row per goal (wins and last win update themselves)
     Wins       one row per "I did it today"

   The page (index.html) sends small messages here:
     { type: "goal",  id, owner, shop, buddy, goal, why, checkin, through, created }
     { type: "win",   id, day, + the goal fields }   tapped "I did it today"
     { type: "unwin", id, day }      tapped it again to undo
     { type: "close", id }           tapped "Remove" on their note
   Phone numbers are never sent here.
   Positive only: it counts wins, never misses.
   ==================================================================== */

const GOAL_HEADERS = ["Goal ID", "Created", "Owner", "Shop", "Buddy", "Goal", "Why it matters", "Check-in", "Through", "Wins", "Last win", "Status"];
const WIN_HEADERS = ["Day", "Goal ID", "Owner", "Shop", "Goal"];
const COL = { id: 1, wins: 10, lastWin: 11, status: 12 };   // column numbers in Goals

// The page posts here. Answers "ok" either way (the page doesn't wait for it).
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);   // one message at a time, so two wins at once don't collide
  try {
    const m = JSON.parse(e.postData.contents);
    if (m.type === "goal") addGoal(m);
    else if (m.type === "win") addWin(m);
    else if (m.type === "unwin") removeWin(m);
    else if (m.type === "close") setStatus(m.id, "Closed");
    return ContentService.createTextOutput("ok");
  } catch (err) {
    return ContentService.createTextOutput("error: " + err);
  } finally {
    lock.releaseLock();
  }
}

// Opening the web address in a browser just says it's working.
function doGet() { return ContentService.createTextOutput("Accountability Notes sheet is connected ★"); }

/* ---------- Goals ---------- */
const clip = (s, n) => String(s || "").slice(0, n || 200);
const asDay = s => { const [y, m, d] = String(s).split("-").map(Number); return y ? new Date(y, m - 1, d) : ""; };

function addGoal(m) {
  if (findGoalRow(m.id)) return;   // already have it (sent twice)
  sheet("Goals").appendRow([clip(m.id, 40), new Date(), clip(m.owner, 40), clip(m.shop, 80), clip(m.buddy, 40),
    clip(m.goal, 160), clip(m.why, 160), clip(m.checkin, 80), asDay(m.through), 0, "", "Active"]);
}
function findGoalRow(id) {
  const s = sheet("Goals"), n = s.getLastRow();
  if (n < 2) return 0;
  const ids = s.getRange(2, COL.id, n - 1, 1).getValues();
  for (let k = 0; k < ids.length; k++) if (String(ids[k][0]) === String(id)) return k + 2;
  return 0;
}
function setStatus(id, status) {
  const row = findGoalRow(id);
  if (row) sheet("Goals").getRange(row, COL.status).setValue(status);
}

/* ---------- Wins ---------- */
function addWin(m) {
  if (m.goal) addGoal(m);   // a win carries its goal, in case the goal never made it here
  const row = findGoalRow(m.id);
  if (!row) return;
  const g = sheet("Goals").getRange(row, 1, 1, GOAL_HEADERS.length).getValues()[0];
  if (findWinRow(m.id, m.day)) return;   // already logged that day
  sheet("Wins").appendRow([asDay(m.day), g[0], g[2], g[3], g[5]]);
  recount(m.id, row);
}
function removeWin(m) {
  const r = findWinRow(m.id, m.day);
  if (r) sheet("Wins").deleteRow(r);
  const row = findGoalRow(m.id);
  if (row) recount(m.id, row);
}
function findWinRow(id, day) {
  const s = sheet("Wins"), n = s.getLastRow();
  if (n < 2) return 0;
  const rows = s.getRange(2, 1, n - 1, 2).getValues(), want = asDay(day).getTime();
  for (let k = 0; k < rows.length; k++) if (String(rows[k][1]) === String(id) && new Date(rows[k][0]).getTime() === want) return k + 2;
  return 0;
}
// Wins + Last win on the goal's row, counted fresh from the Wins tab.
function recount(id, row) {
  const s = sheet("Wins"), n = s.getLastRow();
  const rows = n < 2 ? [] : s.getRange(2, 1, n - 1, 2).getValues().filter(r => String(r[1]) === String(id));
  const last = rows.reduce((a, r) => (!a || r[0] > a ? r[0] : a), "");
  sheet("Goals").getRange(row, COL.wins, 1, 2).setValues([[rows.length, last]]);
}

/* ---------- Setup (run once from the Apps Script editor) ---------- */
function sheet(name) { return SpreadsheetApp.getActive().getSheetByName(name); }

// SHOPFIX LOOK (from shopfixacademy.com): ShopFix red, near-black, white,
// tall ANTON capitals for headlines, Open Sans for everything else.
const SF = { red: "#ac0e1d", black: "#101010", grey: "#5c5c5c", light: "#f4f4f4", head: "Anton", body: "Open Sans" };

function setup() {
  const ss = SpreadsheetApp.getActive();
  const make = (name, headers) => {
    const s = ss.getSheetByName(name) || ss.insertSheet(name);
    s.getRange(1, 1, s.getMaxRows(), s.getMaxColumns()).setFontFamily(SF.body).setFontSize(10).setFontColor(SF.black);
    s.getRange(1, 1, 1, headers.length).setValues([headers]).setFontFamily(SF.head).setFontSize(11)
      .setBackground(SF.red).setFontColor("#ffffff").setVerticalAlignment("middle");
    s.setRowHeight(1, 32);
    s.setFrozenRows(1);
    s.setTabColor(SF.black);
    // Every other row lightly shaded, so long lists are easy to read.
    s.getBandings().forEach(b => b.remove());
    s.getRange(1, 1, s.getMaxRows(), headers.length).applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY, true, false)
      .setHeaderRowColor(SF.red).setFirstRowColor("#ffffff").setSecondRowColor(SF.light);
    return s;
  };
  const goals = make("Goals", GOAL_HEADERS);
  goals.getRange("B:B").setNumberFormat("mmm d, yyyy");
  goals.getRange("I:I").setNumberFormat("mmm d, yyyy");
  goals.getRange("K:K").setNumberFormat("mmm d, yyyy");
  goals.setColumnWidth(6, 320);
  const wins = make("Wins", WIN_HEADERS);
  wins.getRange("A:A").setNumberFormat("ddd mmm d, yyyy");
  wins.setColumnWidth(5, 320);

  // DASHBOARD: all formulas, so it updates by itself.
  const d = ss.getSheetByName("Dashboard") || ss.insertSheet("Dashboard", 0);
  d.clear();
  d.getCharts().forEach(c => d.removeChart(c));
  d.setHiddenGridlines(true);
  d.setTabColor(SF.red);
  d.getRange(1, 1, d.getMaxRows(), d.getMaxColumns()).setFontFamily(SF.body).setFontColor(SF.black).setVerticalAlignment("middle");
  // Black band across the top with the title in big ShopFix capitals, then a thin red line under it.
  d.getRange("A1:G1").setBackground(SF.black);
  d.getRange("A1").setValue("SHOP FIX TRIBE  ·  ACCOUNTABILITY NOTES").setFontFamily(SF.head).setFontSize(24).setFontColor("#ffffff");
  d.setRowHeight(1, 58);
  d.getRange("A2:G2").setBackground(SF.red);
  d.setRowHeight(2, 6);
  d.getRange("A3").setValue("FIX THE OWNER. FIX THE SHOP.  Updates by itself every time an owner saves a goal or logs a win.").setFontSize(9).setFontColor(SF.grey);

  const tiles = [
    ["Active goals", '=COUNTIF(Goals!L2:L,"Active")'],
    ["Owners with a goal", "=IFERROR(COUNTUNIQUE(Goals!C2:C),0)"],
    ["Wins this week", "=COUNTIF(Wins!A2:A,\">=\"&(TODAY()-6))"],
    ["Wins this month", "=COUNTIFS(Wins!A2:A,\">=\"&EOMONTH(TODAY(),-1)+1)"],
    ["Wins all time", "=COUNTA(Wins!A2:A)"],
    ["Goals set this month", "=COUNTIF(Goals!B2:B,\">=\"&EOMONTH(TODAY(),-1)+1)"],
  ];
  d.getRange(5, 1, 1, tiles.length).setValues([tiles.map(t => t[0].toUpperCase())]).setFontColor(SF.grey).setFontSize(8).setFontWeight("bold");
  d.getRange(6, 1, 1, tiles.length).setFormulas([tiles.map(t => t[1])]).setNumberFormat("0").setFontFamily(SF.head).setFontSize(34).setFontColor(SF.red)
    .setHorizontalAlignment("left");
  d.setRowHeight(6, 56);
  d.getRange(5, 1, 2, tiles.length).setBackground(SF.light).setBorder(true, true, true, true, true, false, "#ffffff", SpreadsheetApp.BorderStyle.SOLID_THICK);

  // Section headings: ShopFix capitals with a red line under them.
  const heading = (cell, text, width) => d.getRange(cell).setValue(text).setFontFamily(SF.head).setFontSize(14).setFontColor(SF.black)
    .offset(0, 0, 1, width).setBorder(null, null, true, null, null, null, SF.red, SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
  heading("A8", "MOST WINS THIS MONTH", 3);
  heading("E8", "NEWEST WINS", 3);
  heading("A22", "WINS PER DAY · LAST 30 DAYS", 2);
  d.getRange("A9").setFormula("=IFERROR(QUERY(Wins!A2:D,\"select C, D, count(A) where A >= date '\"&TEXT(EOMONTH(TODAY(),-1)+1,\"yyyy-mm-dd\")&\"' group by C, D order by count(A) desc limit 10 label C 'Owner', D 'Shop', count(A) 'Wins'\",0),\"No wins yet this month\")");

  d.getRange("E9").setFormula("=IFERROR(QUERY(Wins!A2:E,\"select A, C, E where A is not null order by A desc limit 10 label A 'Day', C 'Owner', E 'Goal'\",0),\"No wins yet\")");
  d.getRange("E10:E19").setNumberFormat("ddd mmm d");   // only the win days, not the big number above

  d.getRange("A9:C9").setFontWeight("bold").setFontColor(SF.red);
  d.getRange("E9:G9").setFontWeight("bold").setFontColor(SF.red);
  d.getRange("A23").setFormula("=ARRAYFORMULA({\"Day\",\"Wins\";TODAY()-29+SEQUENCE(30,1,0),COUNTIF(Wins!A2:A,TODAY()-29+SEQUENCE(30,1,0))})");
  d.getRange("A24:A53").setNumberFormat("mmm d");
  const chart = d.newChart().asColumnChart().addRange(d.getRange("A23:B53"))
    .setOption("legend", { position: "none" }).setOption("colors", [SF.red]).setOption("title", "")
    .setOption("fontName", SF.body).setOption("backgroundColor", "#ffffff")
    .setPosition(22, 4, 0, 0).build();
  d.insertChart(chart);
  d.setColumnWidths(1, 6, 150);
  d.setColumnWidth(7, 320);

  // Drop the empty "Sheet1" a new spreadsheet comes with.
  const blank = ss.getSheetByName("Sheet1");
  if (blank && blank.getLastRow() === 0 && ss.getSheets().length > 1) ss.deleteSheet(blank);
}

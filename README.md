# ★ Accountability Notes ★
### For the ShopFix Tribe

Running a shop is busy. The goals that grow the business (calling
customers back, training the team, working on the numbers) get pushed
aside by whatever is on fire today. Accountability Notes helps the
important things happen anyway.

**Pick one goal. Pick one buddy from the tribe. Send them the link.**
Their calendar reminds them, and they send you a quick nudge. You log
your wins.

No app to download, no account, no sign-up. It works on any phone or
computer. Coach Sam and Jazmin see every goal and win on the tribe
spreadsheet, so the whole tribe can celebrate together.

---

## How to set a goal (about 2 minutes)

1. **Open the Accountability Notes link** on your phone or computer.
2. **Write your goal.** Keep it to one thing you can actually do,
   like "Call 5 past customers every Tuesday" instead of "Grow sales."
3. **Add why it matters** (optional, but it helps on the hard days).
4. **Type your first name, your buddy's name, and your shop's name.**
5. **Add your cell number** (optional) so your buddy can tap once to
   text you.
6. **Choose when to check in:**
   - **Every day**: for habits, like a daily huddle
   - **Weekdays**: for shop-day habits
   - **Once a week**: pick the day, good for bigger weekly tasks
   - **Just once**: for one deadline, like "Finish the hiring ad"
7. **Choose the time and how long it runs:** 1 week, 2 weeks, 30 days,
   or 90 days.
8. Tap **Save & share with my buddy.**

The note on the right shows exactly what your buddy will see.

## How to send it to your buddy

After you save, pick one:

- **Text it:** opens your messages with an invite and the link already
  written. Pick your buddy and hit send.
- **Email it:** same, in your email.
- **Copy link:** paste it anywhere (Facebook group, Messenger, WhatsApp).

**Want reminders yourself?** Tap **Google Calendar** or
**iPhone / Outlook** under "Want reminders too?"

## How to track your wins

Your notes are saved under **My notes**, on the same phone or computer
you made them on.

- Tap **I did it today** each time you do it. It counts your wins.
- Tap **Text [buddy]** to send a quick "I did it!" update.
- Tap **Share again** if your buddy lost the link.
- Tap **Remove** when you're done with a goal.

> My notes stay on the device you made them on. If you set a goal on
> your computer, log your wins on your computer.

---

## If you're the buddy

Someone in the tribe picked you. That means they trust you. Your job
takes about 10 seconds a check-in.

1. **Tap the link** they sent you.
2. **Set your reminders:**
   - **Google Calendar:** tap it, then tap **Save**.
   - **iPhone / Outlook:** tap it, then tap **Add All** when your
     calendar opens.

   A reminder pops up on your phone at every check-in, with a link
   back to their note.
3. **When the reminder pops up,** open the link, pick a nudge, and tap
   **Text**. Your messages open with it already written. Hit send.

### Being a great buddy

- **Keep it positive.** Ask about wins, not about what they didn't do.
- **Be quick.** A short text is better than a long one.
- **Celebrate.** When they tell you they did it, make a big deal of it.

---

## Goal ideas for shop owners

Pick something small enough that you'll really do it, and that you'll
feel good about in 30 days.

**Customers & sales**
- Call 5 past customers every Tuesday
- Ask every customer for a Google review this week
- Follow up on every declined repair within 3 days

**Your team**
- Hold a 10-minute morning huddle every weekday
- Tell one team member something they did well every day
- Have a one-on-one with each employee this month

**Numbers**
- Look at my car count and average RO every Friday
- Review my parts and labor margins every Monday
- Set this month's sales goal and share it with the team

**Marketing**
- Post one shop photo on social media every weekday
- Send one email to our customer list each week

**You**
- Leave the shop by 6 PM three days a week
- Take one full day off every week
- Read 10 pages of a business book every day

---

## Questions

**Does it cost anything or use Claude?**
No. It's a regular web page. Nothing runs in Claude, and it uses no AI
or tokens.

**Who can see my goal?**
Your buddy (anyone you send the link to) and Coach Sam and Jazmin.
Every goal and every win you log goes on the ShopFix Tribe spreadsheet
so they can cheer you on. Your cell number is never sent to them.

**Can it text people automatically?**
No. Your buddy's calendar reminds them, and one tap opens a text
that's already written. They hit send.

**I changed phones and My notes is empty.**
Your notes were saved on the old device. Your buddy's link and
reminders still work. Make the note again on your new phone if you
want to keep logging wins.

---

## For Coach Sam and Jazmin: the tribe spreadsheet

Every goal and every "I did it today" goes into one Google Sheet:

- **Dashboard tab:** active goals, owners with a goal, wins this week,
  wins this month, wins all time, goals set this month, the 10 owners
  with the most wins this month, the 10 newest wins, and a chart of wins
  per day over the last 30 days. It updates itself.
- **Goals tab:** one row per goal, with the owner, shop, buddy, goal,
  why, check-in plan, end date, number of wins, last win, and whether
  it's Active or Closed (the owner removed it).
- **Wins tab:** one row per win, with the day, owner, shop, and goal.

Sort, filter, or make your own tabs and charts as you like. Just don't
rename the **Goals** or **Wins** tabs or move their columns, because
new rows are written into them.

**The live spreadsheet (set up 2026-10-21):**
https://docs.google.com/spreadsheets/d/1_sbtv4yOucFpdMylzKJyh-UQQSoQQaPbsW5oH4lzb90/edit
It's owned by Ashleyjo.Bloom@gmail.com and shared as Editor with
samantha.wright@shopfixacademy.com and jazmin.sanders@shopfixacademy.com.
The script project is "Accountability Notes Sheet" (Extensions → Apps
Script), deployed as a web app (Version 1).

## Setting up the spreadsheet (already done; here in case it's ever rebuilt)

1. Go to **sheets.google.com** and click **Blank spreadsheet**. Name it
   **ShopFix Tribe · Accountability Notes**.
2. In the menu, click **Extensions → Apps Script**. A new tab opens.
3. Delete everything in the code box. Open `sheet/Code.gs` from this
   folder, copy all of it, and paste it in. Click the **💾 Save** icon.
4. In the drop-down at the top (next to **Debug**), pick **setup** and
   click **▶ Run**. Google asks for permission: click **Review
   permissions**, pick your account, click **Advanced → Go to
   (project name)**, then **Allow**. Switch back to the spreadsheet tab
   and you'll see the Dashboard, Goals, and Wins tabs.
5. Back in Apps Script, click **Deploy → New deployment**. Click the
   ⚙ gear next to "Select type" and pick **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**

   Click **Deploy**, then **Copy** the **Web app URL** (it ends in `/exec`).
6. Paste that URL to Claude. Claude puts it into the page (`SHEET_URL`
   in `index.html`).
7. In the spreadsheet, click **Share** and add Sam and Jazmin.
   **Editor** lets them build their own tabs. **Viewer** only lets them
   look.

> If you ever change `Code.gs`, use **Deploy → Manage deployments →
> ✏ Edit → Version: New version → Deploy** so the web address stays
> the same.

---

## For whoever maintains this

The page is one file, `index.html`, with no sign-ups. The goal is packed
into the link after the `#`. "My notes" use the browser's localStorage.
Goals and wins are also posted to the Google Sheet's Apps Script web app
(`SHEET_URL`, script in `sheet/Code.gs`). The sheet ignores goals it
already has and wins already logged for that day. The look copies the Sticky
Notes on PNW's Front Counter Board: magenta pulse for your note, baby
blue glow for your buddy's.

### Versions

- **v1 (2026-10-21):** first version. Covers making a note, sharing it,
  buddy reminders (Google and .ics), text nudges, and My notes with wins.
- **v1 README (2026-10-21):** how-to guide for shop owners and buddies,
  plus goal ideas.
- **v2 (2026-10-21):** tribe spreadsheet for Coach Sam and Jazmin. Every
  goal and win is sent to a Google Sheet (`sheet/Code.gs`) with a
  Dashboard tab. Adds a "Your shop" box. The page tells owners their
  goals are shared, and phone numbers are never sent.
- **v2.1 (2026-10-21):** spreadsheet now in the ShopFix look (red,
  black, Anton headlines, Open Sans). The sheet is live and connected
  (`SHEET_URL`) and shared with Sam and Jazmin. A test goal and win
  showed up on the Dashboard, then were deleted.

# ShopFix Accountability Notes

Accountability Notes for Ashley's ShopFix Tribe (ShopFix Academy, a coaching
group for auto shop owners). Shop owners pick one goal and one buddy and
share a link. The buddy gets calendar reminders and sends text nudges.
This started as a copy of the Sticky Notes on PNW's Front Counter Board
(Digital White Board repo), but it's a separate project now. Keep it
separate.

## What's where

- `index.html`: the whole app (one file). Goals live in the share link
  (`#g=...`). "My notes" are saved in the browser's localStorage. Goals and
  wins are posted to the Google Sheet at `SHEET_URL`.
- `sheet/Code.gs`: the Google Apps Script behind the tribe spreadsheet
  (Dashboard, Goals, and Wins tabs, in the ShopFix look).
- `README.md`: how-to for shop owners and buddies, the coach section,
  setup steps, and versions. Add a version line with every change.

## Live

- Site: https://abloom82.github.io/shopfix-accountability-notes/ (GitHub
  Pages, public repo abloom82/shopfix-accountability-notes, `main`, root).
  Every push updates it in about a minute.
- Sheet: https://docs.google.com/spreadsheets/d/1_sbtv4yOucFpdMylzKJyh-UQQSoQQaPbsW5oH4lzb90/edit
  owned by Ashleyjo.Bloom@gmail.com, shared as Editor with Coach Sam
  (samantha.wright@shopfixacademy.com) and her assistant Jazmin
  (jazmin.sanders@shopfixacademy.com). A sheet has only one owner; keep
  Ashley as owner so the script keeps working.
- Script project "Accountability Notes Sheet" (Extensions → Apps Script),
  web app deployment Version 1. After changing Code.gs, paste it into the
  editor, run `setup` if the layout changed, then go to Deploy → Manage
  deployments → Edit → New version so the URL stays the same.

## Rules

- Positive only: count wins, never misses. No promise times.
- Goals are always shared with the coaches (Ashley's choice), and the page
  says so. Never send phone numbers to the sheet.
- The sheet uses the ShopFix look from shopfixacademy.com: red #ac0e1d,
  near-black #101010, Anton headlines, Open Sans body, square buttons.
  The page keeps the sticky-note look (magenta pulse for your note, baby
  blue glow for your buddy's).
- The auto-mode safety check blocks Claude from `git push` here. Commit,
  then ask Ashley to click **Push origin** in GitHub Desktop.
- In Google share boxes, type the email and click the matching
  suggestion. Pressing Enter picked the wrong contacts once.

## About the owner

Ashley owns PNW Automotive and is learning to code. Explain changes in
plain English, keep the plain-English code comments, and give
click-by-click steps for anything she does by hand.

## Testing

Run the "accountability-notes" preview (`.claude/launch.json`, port 8769)
and open http://localhost:8769/index.html (plain `/` doesn't load there; it
does on GitHub Pages). Override `window.toSheet` in the console to capture
messages without touching the real sheet. Delete any TEST rows you add to
the sheet.

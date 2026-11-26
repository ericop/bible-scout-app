# Bible Scout
Finding your way through the scriptures one reading at a time.

## Retired (November 2026)
Bible Scout is no longer running. The Azure Function and AWS Lambda proxies to the Digital Bible Platform v2 API
(`dbt.io`), the GitHub Pages site and the Netlify site were shut down in November 2026. The `biblescout.app`
domain is no longer owned by this project.

The code stays here for reference. `index.html` and `service-worker.js` now hold a retirement notice and a
self-removing service worker; the last working version of the app is commit `37cc3bf`.

## Screenshot
![image](https://github.com/ericop/bible-scout-app/assets/5218249/857874c6-14e9-471f-a96e-36a18896a6e1)

Beta Screenshot
![Snip_2019-07-04_23h27m46s](https://user-images.githubusercontent.com/5218249/60696388-8c330800-9eb3-11e9-9f99-5e0a2cc60010.png)

## Instruction to run locally
- `git clone` the repo
- `npm install`
- `npm run dist` and continue to do so after changes are made to re-bundle

## SVG Creation
- Delete background transparency with https://www.getpaint.net/index.html
- Turn png to svg with https://convertio.co/png-svg/
- Minify svg with https://jakearchibald.github.io/svgomg/
- Add `reserveAspectRatio="xMidYMid meet" fill="#263238" stroke="none"` as attributes in SVG

## Road Map of Future Features
- [x] Allow resetting your reading progress 
- [ ] Add other languages (Spanish, French, Mandarin, etc. )
- [ ] Have Audio span multiple chapters
- [ ] Upgrade to new API to allow audio of part of a chapter
- [ ] Use Roll-up or webpack for hot refresh and TypeScript
- [ ] Convert state management to [meiosis and mergerino](http://meiosis.js.org/tutorial/05-meiosis-with-mergerino.html)
- [ ] Fix service work PWA to only suggest updates when new version is ready (falsely says new version is ready on first load)
- [ ] Add additional reading plans (https://biblestudytogether.com/top-best-bible-reading-plans/)
  - [ ] [Book-at-a-Time Bible Reading Plan](https://www.navigators.org/resource/bible-reading-plans/)
  - [ ] [5x5x5 New Testament Bible Reading Plan](https://www.navigators.org/resource/bible-reading-plans/) 
  - [ ] [Robert Murray M’Cheyne Bible Reading Plan](https://www.crossway.org/articles/download-a-free-bible-reading-plan-for-2017/)
  - [ ] 5 Day Bible Reading Program
  - [ ] [Chronologically Thematic One Year Reading Plan](https://treasureinthebible.com/UndatedThematicallyChronologicalBible%20ReadingPlanRevised2012-11-13.pdf)
  - [ ] (Crossways Chronological Bible Reading Plan](https://www.crossway.org/articles/download-a-free-bible-reading-plan-for-2017/)
- [ ] Partner with others to make visual ? (https://visualunit.me/)


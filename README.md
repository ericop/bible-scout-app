[![Open BibleScout.App in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/ericop/bible-scout-app)

# Bible Scout
https://BibleScout.app finding your way through the scriptures one reading at a time.

## Screenshot
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


//import {BibleMediaService} from '../services/bible-media.service.js'
//import {SettingsComponent} from '../components/settings.component.js'

export const ReadingCardComponent = () => {
    let audioBibleVersion = ''
    let textBibleVersion = ''
    let readingCategory = ''
    let bibleService = BibleMediaService()
    let settingsService = SettingsComponent()
    let audioBaseUrl = ''
    var readingMonth = 1 // 1 = Jan
    var readingDay = 0
    let text = []
    let isLoading = true
    let isLoadingAudioPath = false
    let audioPath = ''
    let nextAudioPath = ''
    let isPlayingAudio = false
    let bibleVerse = ''
    let readingChapters = []
    let isDoneChecked = false
    let justChecked = false
    let readingProgress = { day: 1, month: 1 }
    let isVeryBeginning = () => {
        //console.log('readingDay', readingDay, ' < 2 && readingMonth ===', readingMonth)
        return readingDay < 2 && readingMonth === 1
    }

    let fetchAudioServerPath = () => {
        bibleService.getAudioServerPath().then(data => {
            //console.log('data audio/location', data)
            var secondChoice = data[1]
            audioBaseUrl = `${secondChoice.protocol}://${secondChoice.server}${secondChoice.root_path}/`
            //console.log('audioBaseUrl', audioBaseUrl)
        })
    }

    let fetchAudioPath = (bibleVersion, book, verseString) => {
        isLoadingAudioPath = true

        if (readingChapters > 1){
            bibleService.getAudioPath(bibleVersion, book, verseString).then(data => {
                audioPath = data[0] ? data[0].path : ''
                isLoadingAudioPath = false
            })

        } else {
            bibleService.getAudioPath(bibleVersion, book, verseString).then(data => {
                audioPath = data[0] ? data[0].path : ''
                isLoadingAudioPath = false
            })
        }

    }

    let fetchText = (bibleVerse, book, verseString) => {
        isLoading = true
        text = []

        bibleService.getText(bibleVerse, book, verseString).then(data => {
            console.log('data', data)
            text = data.flat().map(item => {
                return { chapter: item.chapter_id, verseNum: item.verse_id, text: item.verse_text, paragraphNum: item.paragraph_number }
            })
            isLoading = false
        })
    }

    let setInitialData = () => {
        bibleService.setReadingProgress(readingCategory, readingMonth, readingDay)

        var verseInfo = bibleService.getDiscipleShipJournalVerse(readingMonth, readingDay, readingCategory)
        bibleVerse = verseInfo.verse

        let [book, verseString] = verseInfo.verse.split(' ')
        let hasVerses = verseString.indexOf(':') > -1
        console.log('hasVerse', hasVerses)
        let isMultiChapter = !hasVerses && verseString.indexOf('-') > -1
        console.log('isMultiChapter', isMultiChapter, 'from', verseString)
        let isSingleFullChapter = !hasVerses && !isMultiChapter
        console.log('isSingleFullChapter', isSingleFullChapter)

        if (isMultiChapter) {
            let [startChapter, endChapter] = verseString.split('-').map(ch => Number(ch))
            let chapterCount = endChapter - startChapter + 1
            readingChapters = new Array(chapterCount).fill().map((ch, i) => (i + startChapter).toString())
        } else {
            readingChapters = isSingleFullChapter 
            ? [verseString]
            : [verseString.split(':')[0]]
        }

        console.log('readingChapters', readingChapters, 'from', verseString)

        fetchAudioPath(audioBibleVersion, book, verseString)
        fetchText(textBibleVersion, book, verseString)
    }

    let incrementLocalStoreOnly = () => {
        isDoneChecked = document.querySelector('label.done > input').checked
        // console.log('isDoneChecked', isDoneChecked)
        justChecked = isDoneChecked
        let readingMonthForLocalStore = readingMonth // 1 = Jan
        let readingDayForLocalStore = readingDay

        if (isDoneChecked) {
            let shouldGoForwardAMonth = readingDay === 25 && readingMonth < 12
            let shouldStartNewYear = readingDay === 25 && readingMonth === 12

            if (shouldGoForwardAMonth) {
                readingMonthForLocalStore++
                readingDayForLocalStore = 1
            } else if (shouldStartNewYear) {
                readingDayLocalStore = 1
                readingDayForLocalStore = 1
            } else {
                readingDayForLocalStore++
            }
        }

        // console.log(
        //     'readingCategory, readingMonthForLocalStore, readingDayForLocalStore)',
        //     readingCategory,
        //     readingMonthForLocalStore,
        //     readingDayForLocalStore
        // )
        bibleService.setReadingProgress(readingCategory, readingMonthForLocalStore, readingDayForLocalStore)
    }

    let preFetchNextReadingMedia = () => {
        let nextReadingDay = readingDay
        let nextReadingMonth = readingMonth

        let shouldGoForwardAMonth = nextReadingDay === 25 && nextReadingMonth < 12
        let shouldStartNewYear = nextReadingDay === 25 && nextReadingMonth === 12

        if (shouldGoForwardAMonth) {
            nextReadingMonth++
            nextReadingDay = 1
        } else if (shouldStartNewYear) {
            nextReadingDay = 1
            nextReadingMonth = 1
        } else {
            nextReadingDay++
        }

        var verseInfo = bibleService.getDiscipleShipJournalVerse(nextReadingMonth, nextReadingDay, readingCategory)
        console.log('preFetchNextReadingMedia', verseInfo.verse)

        var [book, verseString] = verseInfo.verse.split(' ')

        bibleService.getAudioPath(audioBibleVersion, book, verseString).then(data => {
            console.log('preFetchNextReadingMedia audio', data)
            nextAudioPath = data[0] ? data[0].path : ''
        })

        bibleService.getText(textBibleVersion, book, verseString).then(data => {
            console.log('preFetchNextReadingMedia text', data)
        })
    }

    let increment = () => {
        if (isPlayingAudio) {
            pauseAudio()
        }
        //console.log('increment:isDoneChecked', isDoneChecked)
        isDoneChecked = false
        justChecked = false

        let shouldGoForwardAMonth = readingDay === 25 && readingMonth < 12
        let shouldStartNewYear = readingDay === 25 && readingMonth === 12

        if (shouldGoForwardAMonth) {
            readingMonth++
            readingDay = 1
        } else if (shouldStartNewYear) {
            readingDay = 1
            readingMonth = 1
        } else {
            readingDay++
        }

        setInitialData()
        preFetchNextReadingMedia()
    }

    let incrementReadingCategory = () => {
        let readingCategory = m.route.get().split('/')[1]
        incrementLocalStoreOnly()

        switch (readingCategory) {
            case 'law-and-prophets':
                m.route.set('/wisdom')
                break
            case 'wisdom':
                m.route.set('/gospels')
                break
            case 'gospels':
                m.route.set('/epistles')
                break
            case 'epistles':
                m.route.set('/home')
                break
        }
    }

    let decrement = () => {
        if (isPlayingAudio) {
            pauseAudio()
        }
        //console.log('decrement:isDoneChecked', isDoneChecked)
        isDoneChecked = true
        justChecked = false

        let shouldGoBackAMonth = readingDay === 1 && readingMonth > 1

        if (shouldGoBackAMonth) {
            readingMonth--
            readingDay = 25
        } else {
            readingDay--
        }

        bibleService.setReadingProgress(readingCategory, readingMonth, readingDay)

        var verseInfo = bibleService.getDiscipleShipJournalVerse(readingMonth, readingDay, readingCategory)
        bibleVerse = verseInfo.verse

        var [book, verseString] = verseInfo.verse.split(' ')

        fetchAudioPath(audioBibleVersion, book, verseString)
        fetchText(textBibleVersion, book, verseString)
    }

    let pauseAudio = () => {
        isPlayingAudio = false
        var mp3Player = document.getElementById('mp3-player')
        mp3Player.pause()
    }

    let playAudio = () => {
        isPlayingAudio = true
        var mp3Player = document.getElementById('mp3-player')
        mp3Player.play()
    }

    return {
        oninit: () => {
            readingCategory = m.route.get().split('/')[1]
            switch (readingCategory) {
                case 'law-and-prophets':
                case 'wisdom':
                    audioBibleVersion = 'ENGESVO1DA'
                    textBibleVersion = 'ENGESVO1ET'
                    break
                case 'gospels':
                case 'epistles':
                    audioBibleVersion = 'ENGESVN1DA'
                    textBibleVersion = 'ENGESVN1ET'
                    break
            }
        },
        oncreate: () => {
            isDoneChecked = false
            readingProgress = bibleService.getReadingProgress(readingCategory)
            //console.log('oncreate: readingPlan RETURNED', readingCategory, readingProgress.month, readingProgress.day)
            readingMonth = readingProgress.month
            readingDay = readingProgress.day
            fetchAudioServerPath()
            setInitialData()
        },

        view: () => {
            return m('.card-and-app-bottom', [
                m('.row', [
                    m('.col.s12.m12', [
                        m(
                            '.card',
                            {
                                class: settingsService.getIsDarkMode() ? 'blue-grey darken-3' : 'white',
                            },
                            [
                                m('.card-image', [
                                    m('img.max-height-5em', { src: '/media/card-top.png' }),
                                    m('div.card-title blue-grey-text text-darken-4', [
                                        bibleVerse,
                                        m('audio#mp3-player', {
                                            class: isLoadingAudioPath && !isLoading ? 'hide' : 'right',
                                            controls: `isLoadingAudioPath || isLoading ? '' : 'true'`,
                                            preload: true,
                                            src: bibleService.getAudioFile(`${audioBaseUrl}${audioPath}`),
                                        }),
                                        m('audio#mp3-player-pre-load', {
                                            class: 'hide',
                                            controls: 'true',
                                            preload: true,
                                            src: bibleService.getAudioFile(`${audioBaseUrl}${nextAudioPath}`),
                                        }),
                                    ]),
                                ]),
                                m(
                                    '.card-content',
                                    {
                                        class: settingsService.getIsDarkMode() ? 'white-text' : '',
                                    },
                                    justChecked ? [
                                        m('a.btn-flat.waves-effect.waves-light.btn.orange.blue-grey-text.text-darken-4',
                                        m('i.material-icons', 'done_all')
                                    ),] :
                                    [
                                        m('.progress', { class: !isLoading ? 'hide' : '' }, [m('.indeterminate')]),
                                        m(
                                            '.bible-card-text',
                                            { class: settingsService.getFontSize() },
                                            text.map(v => {
                                                return m('span.verse', [
                                                    v.verseNum == 1 ? m('span', [m('br'), m('strong.verseChapter', `${v.chapter} `)]) : '',
                                                    m('sup.verseNum', `${v.verseNum} `),
                                                    v.text,
                                                ])
                                            })
                                        ),
                                    ]
                                ),
                            ]
                        ),
                    ]),
                ]),
                m('.app-bar-bottom', [
                    m('form.card-actions.button-nav-group', [
                        m(
                            'a.btn-flat.waves-effect.waves-light.btn.orange.blue-grey-text.text-darken-4',
                            {
                                href: '#', // home
                                //onclick='window.location.href="#"' // home
                            },
                            m('i.material-icons', 'home')
                        ),
                        m(
                            'button.btn-flat.waves-effect.waves-light.btn.orange.blue-grey-text.text-darken-4',
                            {
                                disabled: isLoading || isVeryBeginning(),
                                onclick: () => decrement(),
                            },
                            m('i.material-icons', 'chevron_left')
                        ),
                        m(
                            'button.btn-flat.waves-effect.waves-light.btn.orange.blue-grey-text.text-darken-4',
                            {
                                disabled: isLoading,
                                onclick: () => increment(),
                            },
                            m('i.material-icons', 'chevron_right')
                        ),
                        m(
                            'label.done',
                            {
                                disabled: isLoading,
                                onclick: () => incrementLocalStoreOnly(),
                            },
                            [
                                (!isDoneChecked 
                                    ? m('input[type="checkbox"]', {disabled: isLoading}) 
                                    : m('input[type="checkbox"][checked]', {disabled: isLoading})),
                                m('span.black-text')
                            ]
                        ),
                        m(
                            'button.btn-flat.waves-effect.waves-light.btn.orange.blue-grey-text.text-darken-4',
                            {
                                disabled: isLoading,
                                onclick: () => incrementReadingCategory(),
                            },
                            m('i.material-icons', 'skip_next')
                        ),
                    ]),
                    m(
                        'a.btn.halfway-fab.waves-effect.waves-light.teal.accent-1',
                        {
                            disabled: isLoading,
                            class: isPlayingAudio ? 'hide' : '',
                            onclick: () => playAudio(),
                        },
                        m('i.material-icons.blue-grey-text.text-darken-4', 'play_arrow')
                    ),
                    m(
                        'a.btn.halfway-fab.waves-effect.waves-light.btn-large.orange.darken-3',
                        {
                            disabled: isLoading,
                            class: isPlayingAudio ? '' : 'hide',
                            onclick: () => pauseAudio(),
                        },
                        m('i.material-icons', 'pause')
                    ),
                ]),
            ])
        },
    }
}

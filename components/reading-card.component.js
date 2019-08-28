import BibleMediaService from '../services/bible-media.service.js'
import SettingsComponent from '../components/settings.component.js'

const ReadingCardComponent = () => {
    let audioBibleVersion = ''
    let textBibleVersion = ''
    let readingCategory = ''
    let bibleService = BibleMediaService()
    let settingsService = SettingsComponent()
    let audioBaseUrl = ''
    var readingMonth = 1  // 1 = Jan
    var readingDay = 0
    let text = []
    let isLoading = true
    let isLoadingAudioPath = false
    let audioPath = ''
    let isPlayingAudio = false
    let bibleVerse = ''
    let readingProgress = { day: 1, month: 1 }
    let isVeryBeginning = () => {
        //console.log('readingDay', readingDay, ' < 2 && readingMonth ===', readingMonth)
        return readingDay < 2 && readingMonth === 1
    }

    let fetchAudioServerPath = () => {
        bibleService.getAudioServerPath()
            .then((data) => {
                //console.log('data audio/location', data)
                var secondChoice = data[1]
                audioBaseUrl = `${secondChoice.protocol}://${secondChoice.server}${secondChoice.root_path}/`
                //console.log('audioBaseUrl', audioBaseUrl)
            })
    }

    let fetchAudioPath = (bibleVersion, book, verseString) => {
        isLoadingAudioPath = true
        bibleService.getAudioPath(bibleVersion, book, verseString)
            .then((data) => {
                audioPath = data[0] ? data[0].path : ''
                isLoadingAudioPath = false
            })
    }

    let fetchText = (bibleVerse, book, verseString) => {
        isLoading = true
        text = []

        bibleService.getText(bibleVerse, book, verseString)
            .then((data) => {
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

        var [book, verseString] = verseInfo.verse.split(' ')

        fetchAudioPath(audioBibleVersion, book, verseString)
        fetchText(textBibleVersion, book, verseString)
    }

    let increment = () => {
        if (isPlayingAudio) {
            pauseAudio()
        }
        let shouldGoForwardAMonth = readingDay === 25 && readingMonth < 12
        let shouldStartNewYear = readingDay === 25 && readingMonth === 12

        if (shouldGoForwardAMonth) {
            readingMonth++
            readingDay = 1
        }
        else if (shouldStartNewYear) {
            readingDay = 1
            readingMonth = 1
        }
        else {
            readingDay++
        }

        setInitialData()
    }

    let decrement = () => {
        if (isPlayingAudio) {
            pauseAudio()
        }

        let shouldGoBackAMonth = readingDay === 1 && readingMonth > 1

        if (shouldGoBackAMonth) {
            readingMonth--
            readingDay = 25
        }
        else {
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
                    break;
                case 'gospels':
                case 'epistles':
                    audioBibleVersion = 'ENGESVN1DA'
                    textBibleVersion = 'ENGESVN1ET'
                    break;
            }


        },
        oncreate: () => {
            readingProgress = bibleService.getReadingProgress(readingCategory)
            //console.log('readingPlan RETURNED', readingProgress)
            readingMonth = readingProgress.month
            readingDay = readingProgress.day
            //console.log('readingPlan readingMonth RETURNED', readingMonth)
            //console.log('readingPlan readingDay RETURNED', readingDay)
            fetchAudioServerPath()
            setInitialData()
        },

        view: () => {
            return m('.row', [
                m('.col.s12.m12', [
                    m('.card', {
                        class: settingsService.getIsDarkMode() ? 'blue-grey darken-3' : 'white'
                    }, [
                            m('.card-content', {
                                class: settingsService.getIsDarkMode() ? 'white-text' : ''
                            }, [
                                    m('span.card-title', bibleVerse),
                                    m('div', [
                                        m('audio#mp3-player', {
                                            class: isLoadingAudioPath && !isLoading ? 'hide' : '',
                                            controls: `isLoadingAudioPath || isLoading ? '' : 'true'`,
                                            preload: true,
                                            src: bibleService.getAudioFile(`${audioBaseUrl}${audioPath}`)
                                        }),
                                        m('.row',
                                            m('.col s12 m8', [
                                                m('button.btn-floating.waves-effect.waves-light.teal.accent-2',
                                                    {
                                                        disabled: isLoading,
                                                        class: isPlayingAudio ? 'hide' : '',
                                                        onclick: () => playAudio()
                                                    },
                                                    m('i.material-icons.blue-grey-text.text-darken-4',
                                                        'play_arrow'
                                                    )),

                                                m('button.btn-floating.waves-effect.waves-light.orange.darken-4', {
                                                    disabled: isLoading,
                                                    class: isPlayingAudio ? '' : 'hide',
                                                    onclick: () => pauseAudio()
                                                },
                                                    m('i.material-icons',
                                                        'pause'
                                                    )
                                                ),
                                                m('#timeline',
                                                    m('#playhead')
                                                ),
                                                m('.volume-container', [
                                                    m('i.material-icons',
                                                        'volume'
                                                    ),
                                                    m('input.volume', {
                                                        type: 'range',
                                                        min: 0,
                                                        max: 100,
                                                        value: 50
                                                    })
                                                ])
                                            ])
                                        )

                                    ]),
                                    m('.progress', { class: !isLoading ? 'hide' : '' }, [
                                        m('.indeterminate')
                                    ]),
                                    m('.bible-card-text'), text.map(v => {
                                        return m('span.verse',
                                            [
                                                v.verseNum == 1 ? m('span', [m('br'), m('strong.verseChapter', `${v.chapter} `)]) : '',
                                                m('sup.verseNum', `${v.verseNum} `),
                                                v.text
                                            ]
                                        )
                                    }),
                                    m('form.card-actions.button-nav-group', [
                                        m('button.waves-effect.waves-light.btn.amber.accent-3.blue-grey-text.text-darken-4',
                                            {
                                                disabled: isLoading,
                                                class: isVeryBeginning() ? 'hide' : '',
                                                onclick: () => decrement()
                                            }, `Previous Reading`),
                                        m('button.waves-effect.waves-light.btn.amber.accent-4.blue-grey-text.text-darken-4',
                                            {
                                                disabled: isLoading,
                                                onclick: () => increment()
                                            }, `Next Reading`)

                                    ])
                                ]),
                            m('.card-action',
                                m('a', {
                                    class: settingsService.getIsDarkMode() ? 'orange-text text-lighten-2' : 'blue-grey-text text-darken-4',
                                    href: '#!/home'
                                }, [
                                        m('i.material-icons', 'home'),
                                        m('span.action-words', 'Back Home')
                                    ])
                            )
                        ])
                ])
            ])
        }
    }
}

export default ReadingCardComponent

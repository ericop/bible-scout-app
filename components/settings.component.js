import BibleMediaService from '../services/bible-media.service.js'


const SettingsComponent = () => {
    let isDarkMode = true
    let isReadingProgressCleared = false
    let bibleService = BibleMediaService()
    let setColorMore = (colorMode) => {
        console.log('colorMode', colorMode)
        localStorage.setItem('colorMode', colorMode)
    }
    let clearReadingProgress = () => {
        ['law-and-prophets', 'wisdom', 'gospels', 'epistles'].forEach(category => bibleService.setReadingProgress(category, 1, 1))
        isReadingProgressCleared = true
        console.log('isReadingProgressCleared', isReadingProgressCleared)
    }
    let getIsDarkModePrivate = () => {
        let savedColorMode = localStorage.getItem('colorMode')
        return 'dark' === savedColorMode
    }

    return {
        getIsDarkMode: () => 'dark' === localStorage.getItem('colorMode'),
        view: () => {
            return m('.row', [
                m('.col s12 m8', [
                    m('.card', {
                        class: getIsDarkModePrivate() ? 'blue-grey darken-3 white-text' : 'white'
                    }, [
                            m('.card-content', [
                                m('span.card-title', 'Settings'),
                                [
                                    m('.switch',
                                        m('label',
                                            [
                                                'Dark Mode: off',
                                                m('input[type=checkbox]', {
                                                    checked: getIsDarkModePrivate(),
                                                    onclick: () => getIsDarkModePrivate() ? setColorMore('white') : setColorMore('dark')

                                                }),
                                                m('span.lever'),
                                                'on'
                                            ]
                                        )
                                    ),
                                    m('.switch',
                                        m('label',
                                            [
                                                'Auto-Play Audio: off',
                                                m('input[disabled][type="checkbox"]'),
                                                m('span.lever'),
                                                'on'
                                            ]
                                        )
                                    ),
                                    m('br'),
                                    m('button.btn-small.waves-effect.waves-light.orange', {
                                        onclick: () => clearReadingProgress(),
                                        disabled: (isReadingProgressCleared ? 'true' : '')
                                    }, 'Clear Reading Progress')

                                ]
                            ]),
                            m('.card-action',
                                m('a', {
                                    href: '#!/home'
                                }, [
                                        m('i.material-icons', 'home'),
                                        m('span.action-words', 'Back Home')
                                    ]
                                )
                            )
                        ]),
                ])
            ])
        }
    }
}

export default SettingsComponent
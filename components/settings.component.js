//import {BibleMediaService} from '../services/bible-media.service.js'

export const SettingsComponent = () => {
    let isDarkMode = true
    let isReadingProgressCleared = false
    let bibleService = BibleMediaService()
    const categories = ['law-and-prophets', 'wisdom', 'gospels', 'epistles']
    let setColorMode = (colorMode) => {
        console.log('colorMode', colorMode)
        localStorage.setItem('colorMode', colorMode)
    }
    let setFontSize = (fontSize) => {
        console.log('fontSize', fontSize)
        localStorage.setItem('fontSize', fontSize)
    }
    let clearReadingProgress = () => {
        categories.forEach(category => bibleService.setReadingProgress(category, 1, 1))
        isReadingProgressCleared = true
        console.log('isReadingProgressCleared', isReadingProgressCleared)
    }

    let setReadingProgress = () => {
        let category = document.getElementById('category-select').value
        let month = parseInt(document.getElementById('month-select').value)
        let day = parseInt(document.getElementById('day-select').value)
        // category options = ['law-and-prophets', 'wisdom', 'gospels', 'epistles']
        bibleService.setReadingProgress(category, month, day)
        console.log(`setReadingProgress for '${category}' to month '${month}' day '${day}'`)
    }

    let getIsDarkModePrivate = () => {
        let savedColorMode = localStorage.getItem('colorMode')
        return 'dark' === savedColorMode
    }

    let getFontSizePrivate = () => localStorage.getItem('fontSize')

    return {
        oncreate: () => {
            M.FormSelect.init(document.querySelectorAll('select'))
            switch (getFontSizePrivate()) {
                case 'small':
                    document.querySelector('input.small-font').setAttribute('checked', 'checked')
                    break;
                case 'medium':
                    document.querySelector('input.medium-font').setAttribute('checked', 'checked')
                    break;
                case 'large':
                    document.querySelector('input.large-font').setAttribute('checked', 'checked')
                    break;
                default:
                    document.querySelector('input.small-font').setAttribute('checked', 'checked')
                    break;
            }
        },
        getIsDarkMode: () => 'dark' === localStorage.getItem('colorMode'),
        getFontSize: () => localStorage.getItem('fontSize'),
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
                                            m('input[type="checkbox"]', {
                                                checked: getIsDarkModePrivate(),
                                                onclick: () => getIsDarkModePrivate() ? setColorMode('white') : setColorMode('dark')

                                            }),
                                            m('span.lever'),
                                            'on'
                                        ]
                                    )
                                ),
                                //m('form', [
                                m('p',
                                    m('label',
                                        [
                                            m('input.with-gap.small-font[name=font-group][type=radio]', { onclick: () => setFontSize('small') }),
                                            m('span.small-font', 'Small font')
                                        ]
                                    )
                                ),
                                m('p',
                                    m('label',
                                        [
                                            m('input.with-gap.medium-font[name=font-group][type=radio]', { onclick: () => setFontSize('medium') }),
                                            m('span.medium-font', 'Medium font')
                                        ]
                                    )
                                ),
                                //]),
                                m('p',
                                    m('label',
                                        [
                                            m('input.with-gap.large-font[name=font-group][type=radio]', { onclick: () => setFontSize('large') }),
                                            m('span.large-font', 'Large font')
                                        ]
                                    )
                                ),
                                m('br'),
                                m('br'),
                                m('button.btn-small.waves-effect.waves-light.orange.blue-grey-text.text-darken-4', {
                                    onclick: () => clearReadingProgress(),
                                    disabled: (isReadingProgressCleared ? 'true' : '')
                                }, 'Clear Reading Progress'),
                                m('br'),
                                m('br'),
                                m('.card-title', 'Jump Reading Progress To a Specific Day'),
                                m('.input-field.col.s12',
                                    m('select#category-select',
                                        categories.map(v => {
                                            return m('option', { value: v }, v)
                                        }))
                                ),
                                m('.input-field.col.s12',
                                    m('select#month-select',
                                        Array(12).fill(0).map((e, i) => i + 1).map(v => {
                                            return m('option', { value: v }, v)
                                        }))
                                ),
                                m('.input-field.col.s12',
                                    m('select#day-select.orange-text', Array(25).fill(0).map((e, i) => i + 1).map(v => {
                                        return m('option', { value: v }, v)
                                    }))
                                ),
                                m('br'),
                                m('button.btn-small.waves-effect.waves-light.orange.blue-grey-text.text-darken-4', {
                                    onclick: () => setReadingProgress()
                                }, 'Set Reading Progress'),
                                m('br'),
                                m('br'),
                                m('.card-title', 'Work In Progress Settings'),
                                m('.switch',
                                    m('label',
                                        [
                                            'Daily Reminders: off',
                                            m('input[disabled][type="checkbox"]'),
                                            m('span.lever'),
                                            'on'
                                        ]
                                    )
                                ),
                                m('.row',
                                    m('.col.s12',
                                        [
                                            m('.input-field.inline',
                                                [
                                                    m('i.material-icons.prefix', 'alarm'),
                                                    m('input#reminder-time.validate[disabled][type="time"][value="07:30"]'),
                                                    m('label[for="reminder-time"]',
                                                        'Time'
                                                    ),
                                                    m('span.helper-text[data-error="wrong"][data-success="right"]',
                                                        'Should be a proper time'
                                                    )]
                                            )
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
                                )

                            ]
                        ]),
                        m('.card-action',
                            m('a', {
                                class: getIsDarkModePrivate() ? 'orange-text' : 'blue-grey-text text-darken-4',
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
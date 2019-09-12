//import {BibleMediaService} from '../services/bible-media.service.js'

export const SettingsComponent = () => {
    let isDarkMode = true
    let isReadingProgressCleared = false
    let bibleService = BibleMediaService()
    const categories = ['law-and-prophets', 'wisdom', 'gospels', 'epistles']
    let setColorMore = (colorMode) => {
        console.log('colorMode', colorMode)
        localStorage.setItem('colorMode', colorMode)
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

    return {        
        oncreate: () => {    
          M.FormSelect.init(document.querySelectorAll('select'))
        },
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
                                                m('input[type="checkbox"]', {
                                                    checked: getIsDarkModePrivate(),
                                                    onclick: () => getIsDarkModePrivate() ? setColorMore('white') : setColorMore('dark')

                                                }),
                                                m('span.lever'),
                                                'on'
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
                                        m('select#category-select',categories.map(v => {
                                            return m('option', {value: v},v)
                                        }))
                                    ),
                                    m('.input-field.col.s12',
                                        m('select#month-select', Array(12).fill(0).map((e,i)=>i+1).map(v => {
                                            return m('option', {value: v}, v)
                                        }))
                                    ),
                                    m('.input-field.col.s12',
                                        m('select#day-select', Array(25).fill(0).map((e,i)=>i+1).map(v => {
                                            return m('option', {value: v}, v)
                                        }))
                                    ),
                                    m('br'),
                                    m('button.btn-small.waves-effect.waves-light.orange.blue-grey-text.text-darken-4', {
                                        onclick: () => setReadingProgress()
                                    }, 'Set Reading Progress'),
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
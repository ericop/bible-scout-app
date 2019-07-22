import SettingsComponent from '../components/settings.component.js'

const HomeComponent = () => {
    let settingsService = SettingsComponent()

    return {
        view: () => {
            return m('.col s12 m8', [
                m('.card', {
                    class: settingsService.getIsDarkMode() ? 'blue-grey darken-3' : 'white'
                }, [
                        m('.card-content', {
                            class: settingsService.getIsDarkMode() ? 'white-text' : ''
                        }, [
                                m('span.card-title', 'My Daily Reading'),
                                m('p', 'Reading links below')
                            ]),
                        m('.card-action', [
                            m('a', {
                                class: settingsService.getIsDarkMode() ? 'orange-text' : 'blue-grey-text text-darken-4',
                                href: '#!/law-and-prophets'
                            }, [
                                    m('i.material-icons', 'receipt'),
                                    m('span.action-words', 'Law and Prophets')
                                ]),
                            m('a', {
                                class: settingsService.getIsDarkMode() ? 'orange-text' : 'blue-grey-text text-darken-4',
                                href: '#!/wisdom'
                            }, [
                                    m('i.material-icons', 'event_seat'),
                                    m('span.action-words', 'Wisdom')
                                ]),
                            m('a', {
                                class: settingsService.getIsDarkMode() ? 'orange-text' : 'blue-grey-text text-darken-4',
                                href: '#!/gospels'
                            }, [
                                    m('i.material-icons', 'games'),
                                    m('span.action-words', 'Gospels')
                                ]),
                            m('a.', {
                                class: settingsService.getIsDarkMode() ? 'orange-text' : 'blue-grey-text text-darken-4',
                                href: '#!/epistles'
                            }, [
                                    m('i.material-icons', 'mail'),
                                    m('span.action-words', 'Epistles')
                                ])
                        ])
                    ]),
            ])
        }
    }
}
// ot ENGESVO2ET
// nt ENGESVN2ET
export default HomeComponent
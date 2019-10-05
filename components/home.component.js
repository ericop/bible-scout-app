//import {SettingsComponent} from '../components/settings.component.js'

export const HomeComponent = () => {
    let settingsService = SettingsComponent()
    let bibleService = BibleMediaService()
    let getReadingProgressVerse = (category) => {

        let progress = bibleService.getReadingProgress(category)

        // let category = document.getElementById('category-select').value
        // let month = parseInt(document.getElementById('month-select').value)
        // let day = parseInt(document.getElementById('day-select').value)

        // let category = 'wisdom'
        // let month = 1
        // let day =  1
        console.log(`Get Reading Progress to  '${category}' to month '${progress.month}' day '${progress.day}'`)
        let verse = bibleService.getDiscipleShipJournalVerse(parseInt(progress.month), parseInt(progress.day), category)
        console.log('Get Reading Progress to ', verse.verse)
        return `(${progress.month}mo ${progress.day}day - '${verse.verse}')`
    }

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
                                    m('span.action-words', `Law and Prophets ${getReadingProgressVerse('law-and-prophets')}`)
                                ]),
                            m('a', {
                                class: settingsService.getIsDarkMode() ? 'orange-text' : 'blue-grey-text text-darken-4',
                                href: '#!/wisdom'
                            }, [
                                    m('i.material-icons', 'event_seat'),
                                    m('span.action-words', `Wisdom ${getReadingProgressVerse('wisdom')}`)
                                ]),
                            m('a', {
                                class: settingsService.getIsDarkMode() ? 'orange-text' : 'blue-grey-text text-darken-4',
                                href: '#!/gospels'
                            }, [
                                    m('i.material-icons', 'games'),
                                    m('span.action-words', `Gospels ${getReadingProgressVerse('gospels')}`)
                                ]),
                            m('a.', {
                                class: settingsService.getIsDarkMode() ? 'orange-text' : 'blue-grey-text text-darken-4',
                                href: '#!/epistles'
                            }, [
                                    m('i.material-icons', 'mail'),
                                    m('span.action-words', `Epistles ${getReadingProgressVerse('epistles')}`)
                                ])
                        ])
                    ]),
            ])
        }
    }
}
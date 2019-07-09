import SettingsComponent from '../components/settings.component.js'

const AboutComponent = () => {
    let settingsService = SettingsComponent()
    
    return {
        view: () => {
            return m('.row', [
                m('.col s12 m12', [
                    m('.card', {
                        class: settingsService.getIsDarkMode() ? 'blue-grey darken-3': 'white'
                    }, [
                            m('.card-content', {
                                class: settingsService.getIsDarkMode() ? 'white-text' : ''
                            }, [
                                    m('span.card-title', 'About Bible Scout'), [

                                        m('h4.card-sub-heading','Bible Scout: Finding your way through the scriptures one reading at a time'),
                                        m('p', 'The Bible Scout App was created to help you scout (to examine, seek and observe) what is in the Holy Bible. It leads you to read through the Bible using a few different reading plans, and to support hundreds of global languages. Your reading progress will be tracked only on your local device, so no accounts are needed, allowing users from around the world anonymous access to the tool in a way that protect their privacy.'),
                                        m('h4.card-sub-heading', 'Work in Progress'),
                                        m('p', 'This App is still in beta, and features are still being added. Features like being a ', 
                                        m('a[href="https://en.wikipedia.org/wiki/Progressive_web_applications"]', 'Progressive Web App'), 
                                        ', languages beyond English, and resetting your reading progress have yet to be rolled out.'
                                        ),
                                        m('h4.card-sub-heading', 'Reading Plans'),
                                        m('h6', 'The Discipleship Journal Bible Reading Plan'),
                                        m('p', [
                                            m('span', 'Our first reading plan, '),
                                            m('a[href="https://www.navigators.org/wp-content/uploads/2017/04/Discipleship-Journal-Bible-Reading-Plan-9781617479083.pdf"]', 'The Discipleship Journal Bible Reading Plan'),
                                            m('span', [' takes you on a special journey through the Bible.',
                                                m('span.', [
                                                    m('p', m('span.card-sub-heading', '- '), 'Every day the readings come from four different sections of Scripture, keeping things fresh with diverse view points allowing you to go broad and deep.'),

                                                    m('row', m('.col.m1'), m('.col.m11', [
                                                        'For example, the reading for Day 1 includes:',
                                                        m('div', 'A) [Law And Prophets] Genesis 1-2 '),
                                                        m('div', 'B) [Wisdom] Psalms 1'),
                                                        m('div', 'C) [Gospels] Matthew 1:1-17'),
                                                        m('div', 'D) [Epistles] Acts 1:1-11')
                                                    ])
                                                    ),
                                                    m('p', m('span.card-sub-heading', '- '), 'This plan follows a monthly cycle with only 25 scheduled reading days. We all miss days, each month you have days built in to catch up.'),
                                                    m('p', m('span.card-sub-heading', '- '), 'If you finish the month’s readings with all your free days left, you can loop back to memorize a key chapter you like, dig deeper on passages that challenged or intrigued you, or consider building these activities into Sundays next month.'),
                                                    m('p', m('span.card-sub-heading', '- '), 'If reading through the entire Bible in one year looms big, break it down as needed, like picking "Wisdom" and "Epistles" this year, and next year tackling "Gospels" and "Law and Prophets".'),
                                                    m('p', m('span.card-sub-heading', '- '), m('a[href="https://www.desiringgod.org/interviews/a-new-year-a-new-bible-reading-plan"]', 'Further reasons'), ' why you might consider The Discipleship Journal Bible Reading Plan, as laid out by John Piper')
                                                ])
                                            ]),
                                        ]),
                                        m('h4.card-sub-heading', 'Special Thanks'),
                                        m('h6', 'To ', m('a[href="https://www.digitalbibleplatform.com/about"]', 'Digital Bible Platform'), ' for partnering with this app and giving us access to the Bible in text and audio formats.'
                                        ),
                                        m('h6', 'To ', m('a[href="https://play.google.com/store/apps/details?id=huss.john.djbible&hl=en_US"]', 'DJ Bible Reading Plan'), ' which inspired this app to carry on its legacy.',
                                        ),
                                        m('h6', 'To ', m('a[href="https://www.navigators.org/resource/bible-reading-plans"]', 'NavPress'), ' for their generous Fair-Use Permissions that allow reference to their reading plans.'
                                        ),

                                        m('h4.card-sub-heading', 'Report An Issue'),
                                        m('h6', 'To ', m('a[href="https://www.digitalbibleplatform.com/about"]', 'Digital Bible Platform'), ' for partnering with this app and giving us access to the Bible in text and audio formats.'
                                        ),

                                    ]
                                ])
                        ])
                ])
            ])
        }
    }
}

export default AboutComponent
import {BibleMediaService} from '../services/bible-media.service.js'

export const NavComponent = () => {
    let sidenav
    let bibleService = BibleMediaService()
    let readingProgress = { month: 1, day: 1 }
    const updateReadingProgress = () => readingProgress = bibleService.getReadingProgress(m.route.get().split('/')[1])
    const openSideNav = () => {
        sidenav.open()
    }
    const closeSideNav = () => sidenav.close()
    const getIconForCurrentRoute = () => {
        switch (m.route.get().split('/')[1]) {
            case 'law-and-prophets':
                return 'receipt'
            case 'wisdom':
                return 'event_seat'
            case 'gospels':
                return 'games'
            case 'epistles':
                return 'mail'
            case 'settings':
                return 'settings'
            case 'about':
                return 'info'
            case 'home':
                return 'home'
            default:
                return 'import_contacts'
        }
    }

    const kebabToCapitalizedTitle = (kebab) => kebab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

    const isCurrentTopRoute = (route) => {
        return m.route.get().split('/')[1] === route
    }
    return {
        oncreate: () => {
            sidenav = M.Sidenav.init(document.getElementById('side-nav'), { draggable: false, edge: 'left', isFixed: true })
        },

        view: () => {
            return m('.whole-nav',
                [
                    m('.navbar-fixed',
                        [
                            m('nav.nav-second-row.z-depth-3',
                                [
                                    m('#nav-top-row.nav-wrapper.teal.accent-3.z-depth-1',
                                        [
                                            m('span.brand-logo.right.blue-grey-text.text-darken-4', { onclick: openSideNav }, [
                                                m('span.brand-name', 'Bible Scout'),
                                                m('i.right.bible-scout-logo-checkbox-cross')
                                            ]),
                                            m('ul#nav-big.left.hide-on-med-and-down',
                                                [
                                                    m('li',
                                                        { class: isCurrentTopRoute('home') ? 'active' : '' },
                                                        [m('a.navigation__link.blue-grey-text.text-darken-4', {
                                                            href: '#!/home',
                                                            onclick: closeSideNav
                                                        }, [
                                                            m('i.material-icons', 'home')
                                                        ]
                                                        )]
                                                    ),
                                                    m('li',
                                                        { class: isCurrentTopRoute('settings') ? 'active' : '' },
                                                        [m('a.navigation__link.blue-grey-text.text-darken-4', {
                                                            href: '#!/settings',
                                                            onclick: closeSideNav
                                                        }, [
                                                            m('i.material-icons', 'settings')
                                                        ]
                                                        )]
                                                    ),
                                                    m('li',
                                                        { class: isCurrentTopRoute('law-and-prophets') ? 'active' : '' },
                                                        [m('a.navigation__link.blue-grey-text.text-darken-4', {
                                                            href: '#!/law-and-prophets',
                                                            onclick: closeSideNav
                                                        },
                                                            'Law and Prophets'
                                                        )]
                                                    ),
                                                    m('li',
                                                        { class: isCurrentTopRoute('wisdom') ? 'active' : '' },
                                                        [m('a.navigation__link.blue-grey-text.text-darken-4', {
                                                            href: '#!/wisdom',
                                                            onclick: closeSideNav
                                                        },
                                                            'Wisdom'
                                                        )]
                                                    ),
                                                    m('li',
                                                        { class: isCurrentTopRoute('gospels') ? 'active' : '' },
                                                        [m('a.navigation__link.blue-grey-text.text-darken-4', {
                                                            href: '#!/gospels',
                                                            onclick: closeSideNav
                                                        },
                                                            'Gospels'
                                                        )]
                                                    ),
                                                    m('li',
                                                        { class: isCurrentTopRoute('epistles') ? 'active' : '' },
                                                        [m('a.navigation__link.blue-grey-text.text-darken-4', {
                                                            href: '#!/epistles',
                                                            onclick: closeSideNav
                                                        },
                                                            'Epistles'
                                                        )]
                                                    )
                                                ]
                                            ),
                                            m('ul#nav-mobile.left.show-on-small.show-on-medium.hide-on-large-only', [
                                                m('li',
                                                    [m('a.navigation__link.blue-grey-text.text-darken-4', {
                                                        onclick: openSideNav
                                                    }, [
                                                        m('i.material-icons', 'menu')
                                                    ]
                                                    )]
                                                )
                                            ]),
                                        ]
                                    ),
                                    m('.nav-wrapper.nav-with-breadcrumb.orange',
                                        m('.col.s12',
                                            [
                                                m('a.breadcrumb.blue-grey-text.text-darken-4', [
                                                    m('i.material-icons', getIconForCurrentRoute()),
                                                    m('h1', { class: getIconForCurrentRoute() == 'settings' || getIconForCurrentRoute() == 'info' || getIconForCurrentRoute() == 'home' ? '' : 'read-card-heading' },
                                                        kebabToCapitalizedTitle(m.route.get().split('/')[1]))
                                                ]),

                                                m('a.breadcrumb.blue-grey-text.text-darken-4', { class: getIconForCurrentRoute() == 'settings' || getIconForCurrentRoute() == 'info' || getIconForCurrentRoute() == 'home' ? 'hide' : '' },
                                                    m('span', `Month ${updateReadingProgress().month}`)
                                                ),
                                                m('a.breadcrumb.blue-grey-text.text-darken-4', { class: getIconForCurrentRoute() == 'settings' || getIconForCurrentRoute() == 'info' || getIconForCurrentRoute() == 'home' ? 'hide' : '' },
                                                    m('span', `Day ${updateReadingProgress().day}`)
                                                )

                                            ]
                                        )
                                    )
                                ]
                            )
                        ]
                    ),
                    m('ul.#side-nav.sidenav',
                        [
                            m('li',
                                [m('a.navigation__link[href="#!/home"]', {
                                    onclick: closeSideNav
                                }, [
                                    m('i.material-icons', 'home'),
                                    m('span', 'Home')
                                ]
                                )]
                            ),
                            m('li',
                                [m('a.navigation__link[href="#!/law-and-prophets"]', {
                                    onclick: closeSideNav
                                }, [
                                    m('i.material-icons', 'receipt'),
                                    m('span', 'Law and Prophets')
                                ]
                                )]
                            ),
                            m('li',
                                [m('a.navigation__link[href="#!/wisdom"]',
                                    {
                                        onclick: closeSideNav
                                    }, [
                                    m('i.material-icons', 'event_seat'),
                                    m('span', 'Wisdom')
                                ]
                                )]
                            ),
                            m('li',
                                [m('a.navigation__link[href="#!/gospels"]',
                                    {
                                        onclick: closeSideNav
                                    }, [
                                    m('i.material-icons', 'games'),
                                    m('span', 'Gospels')
                                ]
                                )]
                            ),
                            m('li',
                                [m('a.navigation__link[href="#!/epistles"]',
                                    {
                                        onclick: closeSideNav
                                    }, [
                                    m('i.material-icons', 'mail'),
                                    m('span', 'Epistles')
                                ]
                                )]
                            ),
                            m('li',
                                [m('a.navigation__link[href="#!/settings"]', {
                                    onclick: closeSideNav
                                }, [
                                    m('i.material-icons', 'settings'),
                                    m('span', 'Settings')
                                ]
                                )]
                            ),
                            m('li',
                                [m('a.navigation__link[href="#!/about"]', {
                                    onclick: closeSideNav
                                }, [
                                    m('i.material-icons', 'info'),
                                    m('span', 'About')
                                ]
                                )]
                            )
                        ]
                    )
                ]
            )
        }
    }
}
//import {NavComponent} from './components/nav.component.js'
//import {ReadingCardComponent} from './components/reading-card.component.js'
//import {LawAndProphetsComponent} from './components/law-and-prophets.component.js'
//import {GospelsComponent} from './components/gospels.component.js'
//import {WisdomComponent} from './components/wisdom.component.js'
//import {EpistlesComponent} from './components/epistles.component.js'
//import {HomeComponent} from './components/home.component.js'
//import {SettingsComponent} from './components/settings.component.js'
//import {AboutComponent} from './components/about.component.js'

const LayoutComponent = {
    view: (vnode) => {
        return m('.whole-app', [
            m(NavComponent),
            m('main.bible-background',
                // prevents infinite loop to use vnode.children
                vnode.children
            )
        ])
    }
}
window.addEventListener('scroll', (e) => {
    const secondRowNavClasses = ' nav-wrapper nav-with-breadcrumb orange'
    const secondRow = document.querySelector(secondRowNavClasses.split(' ').join('.'))
    const secondRowClassValue = window.scrollY > 50
        ? `${secondRowNavClasses} is-scrolled-down z-depth-3`
        : secondRowNavClasses

    secondRow.setAttribute('class', secondRowClassValue)
})

m.route(document.getElementById('app'), '/home',
    {
        '/home': { render: () => m(LayoutComponent, m(HomeComponent)) },
        '/law-and-prophets': { render: () => m(LayoutComponent, m(LawAndProphetsComponent)) },
        '/wisdom': { render: () => m(LayoutComponent, m(WisdomComponent)) },
        '/gospels': { render: () => m(LayoutComponent, m(GospelsComponent)) },
        '/epistles': { render: () => m(LayoutComponent, m(EpistlesComponent)) },
        '/settings': { render: () => m(LayoutComponent, m(SettingsComponent)) },
        '/about': { render: () => m(LayoutComponent, m(AboutComponent)) }
    }
)
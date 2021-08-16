import {ReadingCardComponent} from '../components/reading-card.component.js'

export const WisdomComponent = () => {
    return {
        view: () => {
            return m(ReadingCardComponent)
        }
    }
}
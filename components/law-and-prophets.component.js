import {ReadingCardComponent} from '../components/reading-card.component.js'

export const LawAndProphetsComponent = () => {
    return {
        view: () => {
            return m(ReadingCardComponent)
        }
    }
}
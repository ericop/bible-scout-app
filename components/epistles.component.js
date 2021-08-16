import {ReadingCardComponent} from '../components/reading-card.component.js'

export const EpistlesComponent = () => {
    return {
        view: () => {
            return m(ReadingCardComponent)
        }
    }
}
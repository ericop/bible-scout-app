import ReadingCardComponent from '../components/reading-card.component.js'

const WisdomComponent = () => {
    return {
        view: () => {
            return m(ReadingCardComponent)
        }
    }
}

export default WisdomComponent
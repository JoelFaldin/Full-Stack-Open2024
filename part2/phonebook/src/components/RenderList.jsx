import ShowData from './ShowData'
import backService from '../services/backService'

const RenderList = ({ personsToShow, update }) => {
    const delNumber = (id) => {
        if (confirm('Do you want to delete this contact?')) {
            backService.remove(id)
            update(id)
        }
    }

    return (
        <>
            {personsToShow.map(person => {
                return (
                <ShowData key={person.id} name={person.name} number={person.number} deleteNumber={() => delNumber(person.id)} />
                )
            })}
        </>
    )
}

export default RenderList
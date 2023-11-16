import ShowData from './ShowData'

const RenderList = ({ personsToShow }) => {
    return (
        <>
            <h3>People data</h3>
            {personsToShow.map(person => {
                return (
                <ShowData key={person.id} name={person.name} number={person.number} />
                )
            })}
        </>
    )
}

export default RenderList
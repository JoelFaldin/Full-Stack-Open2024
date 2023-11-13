const Total = ({ exercises }) => {
    // Calculating the total exercises using the .reduce() method:
    let sum = exercises.reduce((accumulator, current) => {
        return accumulator + current.exercises
    }, 0)

    return (
        <b>Number of exercises: {sum}</b>
    )
}

export default Total;
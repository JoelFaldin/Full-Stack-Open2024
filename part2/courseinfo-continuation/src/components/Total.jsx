const Total = ({ exercises }) => {
    let sum = 0
    exercises.map(quantiy => sum += quantiy.exercises)
    // console.log(sum)

    return (
        <b>Number of exercises: {sum}</b>
    )
}

export default Total;
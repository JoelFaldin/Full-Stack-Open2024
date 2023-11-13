const MostVoted = ({ array, mostVoted, maxVotes }) => {
    if (maxVotes === 0) {
        return <h2>There are no votes.</h2>
    }
    return (
        <>
            <h2>Most Voted Anecdote:</h2>
            <p>{array[mostVoted]}</p>
        </>
    )
}

export default MostVoted
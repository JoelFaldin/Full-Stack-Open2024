const Anecdote = ({ array, votes, selected }) => {
    return (
        <>
            <p>{array[selected]}</p>
            <p>Votes: {votes[selected]}</p>
        </>
    )
}

export default Anecdote
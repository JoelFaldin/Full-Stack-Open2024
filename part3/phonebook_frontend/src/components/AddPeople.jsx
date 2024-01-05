const AddPeople = ({ submitPerson, newName, handleName, newNumber, handleNumber }) => {
    return (
        <>
            <form onSubmit={submitPerson}>
                <span htmlFor="name">name:</span>
                <input placeholder={newName} onChange={handleName} id="name" required />
                <br />
                <span htmlFor="number">number:</span>
                <input placeholder={newNumber} onChange={handleNumber} id="number" required />
                <div>
                    <button type="submit">Add person</button>
                </div>
            </form>
        </>
    )
}

export default AddPeople
const ShowData = ({ name, number, deleteNumber }) => {
    return (
        <label style={{display: 'block'}}>
            <label>{name} {number}</label>
            <button onClick={deleteNumber}>delete</button>
        </label>
    )
}

export default ShowData
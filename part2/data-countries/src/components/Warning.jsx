const Warning = ({ msg }) => {
    if (msg === null) {
        return null
    }
    return (
        <>
            <p>{msg}</p>
        </>
    )
}

export default Warning
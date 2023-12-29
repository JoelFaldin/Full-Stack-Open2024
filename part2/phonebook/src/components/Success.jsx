const Success = ({ msg }) => {
    if (msg === null) {
        return null
    }
    return (
        <div className='success'>
            {msg}
        </div>
    )
}

export default Success
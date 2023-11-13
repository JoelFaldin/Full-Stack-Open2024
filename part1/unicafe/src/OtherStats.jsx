const OtherStats = ({ good, bad, total }) => {
    const average = (good - bad) / total
    const positive = (good / total) * 100
    
    return (
        <>
            <tr>
                <td>Average</td>
                <td>{average}</td>
            </tr>
            <tr>
                <td>Positive</td>
                <td>{positive}%</td>
            </tr>
        </>
    )
}

export default OtherStats
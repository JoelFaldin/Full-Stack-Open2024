import Statistics from "./Statistics"
import OtherStats from "./OtherStats"

const DisplayStats = ({ good, neutral, bad, total }) => {
    if (total === 0) {
        return (
            <p>No stats to show</p>
        )
    }
    return (
        <>
            <table>
                <tbody>
                <Statistics text='good' counter={good} />
                <Statistics text='neutral' counter={neutral} />
                <Statistics text='bad' counter={bad} />

                <tr>
                    <td>Total</td>
                    <td>{total}</td>
                </tr>
                <OtherStats good={good} bad={bad} total={total} />
                </tbody>
            </table>
        </>
        

    )
    
}

export default DisplayStats
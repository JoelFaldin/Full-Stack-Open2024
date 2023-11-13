import { useState } from 'react'
import Button from './Button'
import DisplayStats from "./DisplayStats"

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGood = () => {
    const newValue = good + 1
    setGood(newValue)
    setTotal(newValue + neutral + bad)
  }
  const handleNeutral = () => {
    const newValue = neutral + 1
    setNeutral(newValue)
    setTotal(good + newValue + bad)
  }
  const handleBad = () => {
    const newValue = bad + 1
    setBad(newValue)
    setTotal(good + neutral + newValue)
  }

  return (
    <>
      <h1>Rate us!</h1>
      
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />

      <h2>Statistics</h2>

      <DisplayStats good={good} neutral={neutral} bad={bad} total={total} />
      
    </>
  )
}

export default App

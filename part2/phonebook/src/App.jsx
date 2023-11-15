import { useState } from 'react'

function App() {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-123456'
    }
  ])
  const [newName, setNewName] = useState('Enter a name...')
  const [newNumber, setNewNumber] = useState('Enter a number...')

  const submitPerson = (event) => {
    event.preventDefault()
    // console.log(event.target.name.value)
    const index = persons.findIndex(person => person.name === newName)
    if (index === -1) {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      setPersons(oldPersons => [...oldPersons, newPerson])  
      setNewName('')
      console.log("Person added!")
    } else {
      alert(`${newName} is already added to the phonebook!!!`)
    }
  }

  const handleName = (event) => {
    setNewName(event.target.value)
  }
  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <>
      <h1>PhoneBook</h1>
      <form onSubmit={submitPerson}>
        <span htmlFor="name">name:</span>
        <input placeholder={newName} onChange={handleName} id="name" />
        <br />
        <span htmlFor="number">number:</span>
        <input placeholder={newNumber} onChange={handleNumber} id="number" />
        <div>
          <button type='submit'>Add person</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => {
        return (
          <p key={person.name}>{person.name} {person.number}</p>
        )
      })}
    </>
  )
}

export default App

import { useEffect, useState } from 'react'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('Enter a name...')
  const [newNumber, setNewNumber] = useState('Enter a number...')
  const [show, setShow] = useState('')
  const [personsToShow, setPersonsToShow] = useState([...persons])

  const submitPerson = (event) => {
    event.preventDefault()
    const index = persons.findIndex(person => person.name === newName)
    if (index === -1) {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
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
  const handleChange = (event) => {
    setShow(event.target.value)
  }

  useEffect(() => {
    setPersonsToShow(persons.filter(person => person.name.includes(show)))
    // console.log(personsToShow)
  }, [show])

  return (
    <>
      <h1>PhoneBook</h1>

      <input placeholder='Enter a person' onChange={handleChange} />

      <h2>Add a new person:</h2>
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

      <h3>Numbers</h3>
      {personsToShow.map(person => {
        return (
          <p key={person.id}>{person.name} {person.number}</p>
        )
      })}
    </>
  )
}

export default App

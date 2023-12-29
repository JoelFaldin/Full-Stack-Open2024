import { useEffect, useState } from 'react'
import RenderList from './components/RenderList'
import AddPeople from './components/AddPeople'
import Filter from './components/Filter'
import backService from './services/backService'

function App() {
  const [persons, setPersons] = useState([])  
  const [newName, setNewName] = useState('Enter a name...')
  const [newNumber, setNewNumber] = useState('Enter a number...')
  const [show, setShow] = useState('')

  useEffect(() => {
    console.log('effect')
    backService
      .getNumbers()
      .then(numbers => {
        setPersons(numbers)
      })
  }, [])

  console.log(`rendering ${persons.length} contacts`)

  const showing = !show ? persons : persons.filter(person => person.name.includes(show))

  const submitPerson = (event) => {
    event.preventDefault()
    const index = persons.findIndex(person => person.name === newName)
    if (index === -1) {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons[persons.length - 1].id + 1
      }
      backService
        .addNumber(newPerson)
        .then(contact => {
          setPersons(persons.concat(contact))
        })
      console.log("Person added!")
    } else {
      if (confirm(`${newName} is already added. Wanna to replace old number with the new one?`)) {
        const person = persons.find(person => person.name === newName)
        const newPerson = {
          name: person.name,
          number: newNumber,
          id: person.id
        }
        backService
          .update(person.id, newPerson)
          backService
            .getNumbers()
            .then(list => {
              setPersons(list)
            })
      }
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
  const handleUpdate = (event) => {
    const newList = persons.filter(identifier => identifier.id !== event)
    setPersons(newList)
  }

  return (
    <>
      <h1>PhoneBook</h1>
      <Filter change={handleChange} />

      <h2>Add a new person:</h2>
      <AddPeople submitPerson={submitPerson} newName={newName} handleName={handleName} newNumber={newNumber} handleNumber={handleNumber} />

      <h3>People data</h3>
      <RenderList personsToShow={showing} update={handleUpdate} />
    </>
  )
}

export default App

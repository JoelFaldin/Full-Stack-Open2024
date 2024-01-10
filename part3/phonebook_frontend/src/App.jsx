import { useEffect, useState } from 'react'
import RenderList from './components/RenderList'
import AddPeople from './components/AddPeople'
import Filter from './components/Filter'
import backService from './services/backService'
import Success from './components/Success'
import Error from './components/Error'

function App() {
  const [persons, setPersons] = useState([])  
  const [newName, setNewName] = useState('Enter a name...')
  const [newNumber, setNewNumber] = useState('Enter a number...')
  const [show, setShow] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

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
          setMessage(`${newName} was succesfully added!`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        console.log("Person added!")
        })
        .catch(error => {
          if (error.response.data.error) {
            setError(error.response.data.error)
            setTimeout(() => {
              setError(null)
            }, 10000)
          } else {
            console.log(error.response.data)
          }
        })
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
          .catch(er => {
            setError(`${newName}'s information has been deleted from the server.`)
            setTimeout(() => {
              setError(null)
            }, 10000)
            setMessage(null)
          })
        backService
          .getNumbers()
          .then(list => {
            setPersons(list)
          })
        setMessage(`${newName}'s name was succesfully updated!`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
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
      <Success msg={message} />
      <Error msg={error} />

      <Filter change={handleChange} />

      <h2>Add a new person:</h2>
      <AddPeople submitPerson={submitPerson} newName={newName} handleName={handleName} newNumber={newNumber} handleNumber={handleNumber} />

      <h3>People data</h3>
      <RenderList personsToShow={showing} update={handleUpdate} />
    </>
  )
}

export default App

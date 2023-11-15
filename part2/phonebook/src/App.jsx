import { useState } from 'react'

function App() {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas'}
  ])
  const [newName, setNewName] = useState('Enter a name...')

  const submitPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName
    }
    if (JSON.stringify(persons[0]) !== JSON.stringify(newPerson)) {
      setPersons(persons.concat(newPerson))
      setNewName('')
    }
    else {
      alert(`${newPerson.name} is already added!!!`)
    }
    
  }
  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <>
      <h1>PhoneBook</h1>
      <form onSubmit={submitPerson}>
        name: <input placeholder={newName} onChange={handleChange} />
        <div>
          <button type='submit'>Add person</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => {
        return <p key={person.name}>{person.name}</p>
      })}
    </>
  )
}

export default App

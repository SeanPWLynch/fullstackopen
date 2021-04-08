import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])


  const [newName, setNewName] = useState('Enter Name Here...')
  const [newNumber, setNewNumber] = useState('Enter Number Here...')
  const [nameFilter, setNameFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    console.log(newPerson)
    console.log(persons.some(person => person.name === newPerson.name))
    if (!persons.some(person => person.name === newPerson.name)) {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
    else {
      alert(`${newPerson.name} is already added to phonebook`)
    }
  }


  const handleNameValueChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberValueChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const personsToShow = setNameFilter === '' ? persons : persons.filter(person => person.name.toUpperCase().includes(nameFilter.toUpperCase()))


  return (
    <div>
      
      <h2>Phonebook</h2>
      <div>
        Filter shown with: <input onChange={handleNameFilterChange} value={nameFilter} />
      </div>

      <h2>Add New</h2>
      <form onSubmit={addName}>
        <div>
          Name:  <input onChange={handleNameValueChange} value={newName} />
        </div>
        <div>
          Number:  <input onChange={handleNumberValueChange} value={newNumber} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person => <Person key={person.name} person={person} />)}
      </ul>
    </div>
  )
}

export default App
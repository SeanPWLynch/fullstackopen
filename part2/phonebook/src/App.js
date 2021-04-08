import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components//Persons'

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

      <Filter changeHandler={handleNameFilterChange} filter={nameFilter} />

      <h3>Add New</h3>

      <PersonForm
        submitHandler={addName}
        nameChangeHandler={handleNameValueChange}
        numberChangeHandler={handleNumberValueChange}
        nameValue={newName}
        numberValue={newNumber}
      />

      <h2>Numbers</h2>

      <Persons personList={personsToShow} />

    </div>
  )
}

export default App
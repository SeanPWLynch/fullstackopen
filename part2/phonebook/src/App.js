import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components//Persons'
import personService from './services/personService'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('Enter Name Here...')
  const [newNumber, setNewNumber] = useState('Enter Number Here...')
  const [nameFilter, setNameFilter] = useState('')

  const getPersons = () => {
    personService.getAll()
      .then(initialPersons => { setPersons(initialPersons) })
  }

  useEffect(getPersons, [])

  const addName = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (!persons.some(person => person.name === newPerson.name)) {
      personService.create(newPerson).then(returnedPerson => setPersons(persons.concat(returnedPerson)))
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
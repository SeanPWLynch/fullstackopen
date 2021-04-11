import React from 'react'

const Person = ({ person, deleteHandler }) => {
  return (
    <li>{person.name} {person.number} <button value={person.id} onClick={deleteHandler}>Delete</button> </li>
  )
}

export default Person
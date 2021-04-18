import React from 'react';
import Person from './Person';

const Persons = ({ personList, deleteHandler }) => {
  return (
    <ul>
      {personList.map(person => <Person key={person.name} person={person} deleteHandler={deleteHandler} />)}
    </ul>
  )
}

export default Persons
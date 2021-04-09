import React from 'react';
import Person from './Person';

const Persons = ({ personList }) => {
  return (
    <ul>
      {personList.map(person => <Person key={person.name} person={person} />)}
    </ul>
  )
}

export default Persons
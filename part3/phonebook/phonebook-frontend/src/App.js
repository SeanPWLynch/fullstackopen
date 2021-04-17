import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components//Persons";
import personService from "./services/personService";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("Enter Name Here...");
  const [newNumber, setNewNumber] = useState("Enter Number Here...");
  const [nameFilter, setNameFilter] = useState("");
  const [statusMessage, setStatusMessage] = useState(null);

  const getPersons = () => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  };

  useEffect(getPersons, []);

  //
  const addName = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (!persons.some((person) => person.name === newPerson.name)) {
      personService
        .create(newPerson)
        .then((returnedPerson) => {
          setStatusMessage({
            type: "success",
            text: `Added ${newPerson.name}`,
          });
          setTimeout(() => {
            setStatusMessage(null);
          }, 5000);
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.log(error);
          setStatusMessage({
            type: "error",
            text: error.response.data.error,
          });
          setTimeout(() => {
            setStatusMessage(null);
          }, 5000);
        });
    } else {
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook, replace old number with new one?`
        )
      ) {
        updateNumber(
          persons.find((person) => person.name === newPerson.name),
          newPerson
        );
      }
    }
  };

  const updateNumber = (person, newPerson) => {
    console.log("Updating ", person.name, " with new number: ", newPerson);
    personService
      .update(person.id, newPerson)
      .then((returnedNumber) => {
        setPersons(
          persons.map((person) =>
            person.id !== returnedNumber.id ? person : returnedNumber
          )
        );
      })
      .catch((error) => {
        setStatusMessage({
          type: "error",
          text: error.response.data.error,
        });
        setTimeout(() => {
          setStatusMessage(null);
        }, 5000);
      });
  };

  const handleNameValueChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberValueChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleDeleteName = (event) => {
    console.log(event.target.value);
    const toDelete = persons.find((person) => person.id === event.target.value);
    if (window.confirm(`Delete ${toDelete.name}?`)) {
      console.log("Deleting: ", event.target.value);
      personService
        .remove(event.target.value)
        .then(() => {
          const newPersonArray = persons.filter(
            (person) => person.id !== event.target.value
          );
          setPersons(newPersonArray);
        })
        .catch((error) => {
          setStatusMessage({
            type: "error",
            text: error.response.data.error,
          });
          setTimeout(() => {
            setStatusMessage(null);
          }, 5000);
          const newPersonArray = persons.filter(
            (person) => person.id !== event.target.value
          );
          setPersons(newPersonArray);
        });
    }
  };

  const personsToShow =
    setNameFilter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toUpperCase().includes(nameFilter.toUpperCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={statusMessage} />
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

      <Persons personList={personsToShow} deleteHandler={handleDeleteName} />
    </div>
  );
};

export default App;

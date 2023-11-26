import { useState, useEffect } from "react";
import personsService from "../services/person";

const Filter = ({ filterInfo: { nameFilter, setNameFilter } }) => {
  return (
    <p>
      filter shown with{" "}
      <input
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
      />
    </p>
  );
};

const Persons = ({ persons, nameFilter }) =>
  persons
    .filter((person) =>
      person.name.toLowerCase().includes(nameFilter.toLowerCase())
    )
    .map((person) => (
      <p key={person.id} style={{ margin: "0px" }}>
        {person.name} {person.number}
      </p>
    ));

const PersonForm = ({ addPerson, newNameState, newNumberState }) => {
  const { newName, setNewName } = newNameState;
  const { newNumber, setNewNumber } = newNumberState;
  return (
    <form onSubmit={addPerson}>
      <div>
        name:{" "}
        <input
          value={newName}
          onChange={(e) => {
            setNewName(e.target.value);
          }}
        />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={(e) => {
            setNewNumber(e.target.value);
          }}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    personsService.getAll().then((persons) => setPersons(persons));
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    if (personAlreadyExists(newName)) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    personsService
      .create(personObject)
      .then((person) => setPersons(persons.concat(person)));

    setNewName("");
  };

  const personAlreadyExists = (personName) => {
    return Object.values(persons)
      .map((person) => person.name)
      .includes(personName);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterInfo={{ nameFilter, setNameFilter }} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newNameState={{ newName, setNewName }}
        newNumberState={{ newNumber, setNewNumber }}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} nameFilter={nameFilter} />
    </div>
  );
};

export default App;

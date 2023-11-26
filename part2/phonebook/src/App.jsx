import { useState } from "react";

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
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const addPerson = (e) => {
    e.preventDefault();
    personAlreadyExists(newName)
      ? alert(`${newName} is already added to the phonebook`)
      : setPersons(
          persons.concat({
            name: newName,
            number: newNumber,
            id: persons.length + 1,
          })
        );
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

import { useState, useEffect } from "react";
import personsService from "../services/person";

const Notification = ({ messageInfo }) => {
  const { message, setMessage } = messageInfo;
  if (message.message === null) {
    return null;
  }

  setTimeout(() => setMessage({ message: "", isError: false }), 3000);
  return (
    <div className={`notification ${message.isError && "error"}`}>
      {message.message}
    </div>
  );
};

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

const deletePerson = (id, { persons, setPersons }, setMessage) => {
  const person = persons.find((p) => p.id === id);
  if (window.confirm(`Delete ${person.name} ?`)) {
    personsService.getAll().then((persons) => {
      if (persons.find((p) => p.id === id)) {
        personsService.remove(id).then(() => {
          setPersons(persons.filter((p) => p.id != id));
        });
      } else {
        setMessage({
          message: `Information of ${person.name} has already been removed from the server`,
          isError: true,
        });
        setPersons(persons);
      }
    });
  }
};

const Persons = ({ personsState, messageState, nameFilter }) => {
  const { persons, setPersons } = personsState;
  const { message, setMessage } = messageState;
  if (persons.length === 0) {
    return <p>loading...</p>;
  }
  return persons
    .filter((person) =>
      person.name.toLowerCase().includes(nameFilter.toLowerCase())
    )
    .map((person) => (
      <div key={person.id} style={{ display: "flex", gap: "0.5rem" }}>
        <p style={{ margin: "0px" }}>
          {person.name} {person.number}
        </p>
        <button
          onClick={() => deletePerson(person.id, personsState, setMessage)}
        >
          delete
        </button>
      </div>
    ));
};

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
  const [message, setMessage] = useState({ message: "", isError: false });

  useEffect(() => {
    personsService.getAll().then((persons) => setPersons(persons));
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    if (personAlreadyExists(newName)) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        personsService.getAll().then((persons) => {
          if (persons.find((p) => p.name === newName)) {
            let targetPerson = persons.find((p) => p.name === newName);
            targetPerson = { ...targetPerson, number: newNumber };
            personsService.update(targetPerson.id, targetPerson);
            setPersons(
              persons.map((person) =>
                person.id === targetPerson.id ? targetPerson : person
              )
            );
            setMessage({
              message: `Updated ${newName}'s number`,
              isError: false,
            });
          } else {
            setMessage({
              message: `Information of ${newName} has already been removed from the server`,
              isError: true,
            });
            setPersons(persons);
          }
        });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      personsService
        .create(personObject)
        .then((person) => setPersons(persons.concat(person)));
      setMessage({ message: `Added ${newName}`, isError: false });
    }
    setNewName("");
    setNewNumber("");
  };

  const personAlreadyExists = (personName) => {
    return Object.values(persons)
      .map((person) => person.name)
      .includes(personName);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {message.message && (
        <Notification messageInfo={{ message, setMessage }} />
      )}
      <Filter filterInfo={{ nameFilter, setNameFilter }} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newNameState={{ newName, setNewName }}
        newNumberState={{ newNumber, setNewNumber }}
      />
      <h3>Numbers</h3>
      <Persons
        personsState={{ persons, setPersons }}
        messageState={{ message, setMessage }}
        nameFilter={nameFilter}
      />
    </div>
  );
};

export default App;

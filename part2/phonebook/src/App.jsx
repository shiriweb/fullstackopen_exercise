import { useState, useEffect } from "react";
import personService from "./services/persons";
import Persons from "./component/Persons";
import PersonForm from "./component/PersonForm";
import Filter from "./component/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((p) => p.name === newName);

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook. Replace the old number with a new one?`
      );

      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        personService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== existingPerson.id ? p : returnedPerson
              )
            );
            setNewName("");
            setNewNumber("");
          })
          .catch(() => {
            alert(
              `Information of ${newName} has already been removed from server`
            );
            setPersons(persons.filter((p) => p.id !== existingPerson.id));
          });
      }
      return;
    }

    const newPerson = { name: newName, number: newNumber };
    personService.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const deletePerson = (id, name) => {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      })
      .catch(() => {
        alert(`Information of ${name} was already removed from server`);
        setPersons(persons.filter((p) => p.id !== id));
      });
  };

  const personsToShow = persons.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />

      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;

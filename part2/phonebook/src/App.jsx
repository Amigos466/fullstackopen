import { useEffect, useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personsService
      .getAll()
      .then(persons => {
        setPersons(persons);
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();

    const isAlreadyInList = persons.some(person => person.name === newName);
    if (isAlreadyInList) {
      return alert(`${newName} is already added to phonebook`);
    }

    personsService
      .create({ name: newName, phone: phoneNumber })
      .then(person => {
        setPersons([...persons, person]);
      })

    setNewName('');
    setPhoneNumber('');
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personsService
        .deleteRequest(person.id)
        .then(result => {
          const newPersons = persons.filter(person => person.id !== result.id);
          setPersons(newPersons);
        })
    }
  }

  const filteredPersons = persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filter} onFilterChange={setFilter} />
      <h2>add new</h2>
      <PersonForm
        currentName={newName}
        currentNumber={phoneNumber}
        setCurrentName={setNewName}
        setCurrentNumber={setPhoneNumber}
        onSubmit={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDelete={deletePerson} />
    </div>
  )
}

export default App
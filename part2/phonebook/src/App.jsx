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

  const updatePerson = (person) => {
    if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one ?`)) {
      personsService.update(person.id, person)
        .then(updatedPerson => {
          setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
        })
    }
    setNewName('');
    setPhoneNumber('');
  }

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(person => person.name === newName);
    if (existingPerson) {
      updatePerson({ ...existingPerson, name: newName, number: phoneNumber });
      return;
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
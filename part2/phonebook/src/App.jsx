import { useEffect, useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();

    const isAlreadyInList = persons.some(person => person.name === newName);
    if (isAlreadyInList) {
      return alert(`${newName} is already added to phonebook`);
    }

    axios
      .post('http://localhost:3001/persons', { name: newName, phone: phoneNumber })
      .then(response => {
        setPersons([...persons, response.data]);
      })

    setNewName('');
    setPhoneNumber('');
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
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App
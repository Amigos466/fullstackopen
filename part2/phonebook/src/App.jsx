import { useEffect, useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsService from './services/persons';
import Notification from './components/Notification';
import './App.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personsService
      .getAll()
      .then(persons => {
        setPersons(persons);
      })
      .catch(() => {
        setErrorMessage('Some error happened');
      })
  }, [])

  const updatePerson = (person) => {
    if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one ?`)) {
      personsService.update(person.id, person)
        .then(updatedPerson => {
          setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
          setNotification(
            `Number of ${person.name} changed`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setErrorMessage(`Information of ${person.name} has already been removed from server`);
          } else {
            setErrorMessage('Some error happened');
          }
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
      .create({ name: newName, number: phoneNumber })
      .then(person => {
        setPersons([...persons, person]);
        setNotification(
          `Added ${person.name}`
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch(() => {
        setErrorMessage('Some error happened');
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
        .catch((err) => {
          if (err.response.status === 404) {
            setErrorMessage(`Information of ${person.name} has already been removed from server`);
          } else {
            setErrorMessage('Some error happened');
          }
        })
    }
  }

  const filteredPersons = persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} className="added-updated-item" />
      <Notification message={errorMessage} className="error" />
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
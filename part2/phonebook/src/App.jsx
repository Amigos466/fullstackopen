import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [filter, setFilter] = useState('');

  const addPerson = (event) => {
    event.preventDefault();

    const isAlreadyInList = persons.some(person => person.name === newName);
    if (isAlreadyInList) {
      return alert(`${newName} is already added to phonebook`);
    }

    setPersons([...persons, { name: newName, phone: phoneNumber }]);
    setNewName('');
    setPhoneNumber('');
  }

  const filteredPersons = persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      <h2>add new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number: <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map(person => (
        <p key={person.name}>{person.name} {person.phone}</p>
      ))}
    </div>
  )
}

export default App
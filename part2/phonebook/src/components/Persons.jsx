const Persons = ({ persons, onDelete }) => (
    persons.map(person => (
        <p key={person.name}>{person.name} {person.phone} <button onClick={() => onDelete(person)}>delete</button></p>
    ))
)

export default Persons;
const PersonForm = ({ currentName, currentNumber, setCurrentName, setCurrentNumber, onSubmit }) => (
    <form onSubmit={onSubmit}>
        <div>
            name: <input value={currentName} onChange={(e) => setCurrentName(e.target.value)} />
        </div>
        <div>
            number: <input value={currentNumber} onChange={(e) => setCurrentNumber(e.target.value)} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

export default PersonForm;
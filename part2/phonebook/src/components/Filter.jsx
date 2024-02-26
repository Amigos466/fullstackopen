const Filter = ({ filterValue, onFilterChange }) => (
    <>
        filter shown with <input value={filterValue} onChange={(e) => onFilterChange(e.target.value)} />
    </>
)

export default Filter;
import { useEffect, useState } from "react";
import countriesService from "./services/countries";
import SingleCountryData from "./components/SingleCountryData";
import CountriesList from "./components/CountriesList";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    countriesService.getAll()
      .then(result => setCountries(result))
      .catch(err => console.warn(err))
  }, [])

  const filteredCountries = countries
    .filter(country => country.name.official.toLowerCase().includes(search.toLocaleLowerCase()))

  const renderCountriesData = () => {
    switch (true) {
      case filteredCountries.length === 1:
        return <SingleCountryData country={filteredCountries[0]} />
      case filteredCountries.length > 10:
        return 'Too many matches, specify another filter'
      default:
        return <CountriesList countries={filteredCountries} />
    }
  }

  return (
    <div>
      find countries: <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <div>
        {renderCountriesData()}
      </div>
    </div>
  )
}

export default App;
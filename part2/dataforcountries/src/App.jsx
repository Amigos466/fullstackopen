import { useEffect, useState } from "react";
import countriesService from "./services/countries";

const SingleCountryData = ({ country }) => {
  return (
    <>
      <h2>{country.name.official}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <br />
      <h3>languages:</h3>
      <ul>
        {Object.keys(country.languages)
          .map(languageKey => <li key={languageKey}>{country.languages[languageKey]}</li>)
        }
      </ul>
      <img src={country.flags.png} alt="flag" />
    </>
  )
}

const CountriesList = ({ countries }) => (
  countries.map(country => <p key={country.cca2}>{country.name.official}</p>)
)

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
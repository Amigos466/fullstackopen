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

export default SingleCountryData;
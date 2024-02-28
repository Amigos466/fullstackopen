import { useState } from "react";
import SingleCountryData from "./SingleCountryData";

const CountriesList = ({ countries }) => {
    const [expanded, setExpanded] = useState([]);

    return (
        countries.map(country => {
            const isExpanded = expanded.includes(country.cca2);
            return (<div key={country.cca2}>
                <p>
                    {country.name.official}
                    {isExpanded ?
                        <button onClick={() => setExpanded(expanded.filter(cca2 => country.cca2 !== cca2))}>hide</button>
                        : <button onClick={() => setExpanded([...expanded, country.cca2])}>show</button>}
                </p>
                {isExpanded ? (
                    <SingleCountryData country={country} />
                ) : null}
            </div>
            )
        })
    )
}
export default CountriesList;
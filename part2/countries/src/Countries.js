import React from "react";

const Countries = ({countries, handleSingle}) => {
    if(countries)
        return(<ul>{countries.map(country => <li key={country.name.official}>{country.name.common} <button onClick={() => handleSingle(country.name.common)}>{"show"}</button></li>)}</ul>)
}

export default Countries;
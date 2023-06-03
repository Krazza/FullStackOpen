import React from "react";

const Countries = ({countries}) => {
    if(countries)
        return(<ul>{countries.map(country => <li key={country.name.official}>{country.name.common}</li>)}</ul>)
}

export default Countries;
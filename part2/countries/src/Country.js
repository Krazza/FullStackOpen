import React from "react";

const Country = ({country}) => {
    return(
        <div>
            <h3>{country.name.common}</h3>
            <p>{"Capital: "}{country.capital}</p>
            <p>{"Area: "}{country.area}</p>
            <h4>{"Languages"}</h4>
            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt="flag pic."/>
        </div>
    )
}

export default Country;
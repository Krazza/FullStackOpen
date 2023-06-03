import React from "react";

const Country = ({country, weatherData}) => {

    if(country && weatherData)
    {
        const cel = (weatherData.main.temp)-273.15;
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
                <section>
                    <h3>{"Weather"}</h3>
                    <p>{`${weatherData.weather[0].main}, ${weatherData.weather[0].description}`}</p>
                    <p>{`Temperature: ${parseFloat(cel).toPrecision(3)} Celcius`}</p>
                    <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="weather icon"/>
                    <p>{`Wind speed: ${weatherData.wind.speed} m/s`}</p>
                </section>
            </div>
        )
    }
}

export default Country;
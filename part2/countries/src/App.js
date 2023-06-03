import React, { useState, useEffect } from "react";
import countriesService from "./services/CountriesData";
import weatherSvervice from "./services/WeatherData";
import Countries from "./Countries";
import Country from "./Country";

function App() {
	const [countries, setCountries] = useState(null);
	const [filteredCountries, setFilteredCountries] = useState(null);
	const [search, setSearch] = useState("");
	const [chosenCountry, setChosenCountry] = useState(null);
	const [chosenWeatherData, setChosenWeatherData] = useState(null);

	useEffect(()=>{
		countriesService.getAll().then(response => setCountries(response));
	}, [])

	useEffect(()=>{
		if(chosenCountry)
			{
				weatherSvervice.getBasicOne(chosenCountry.capitalInfo.latlng[0], chosenCountry.capitalInfo.latlng[1])
				.then(response => {setChosenWeatherData(response)})
			}
	}, [chosenCountry])

	useEffect(()=>{
		if(countries)
		{
			if(search !== "")
			{
				const filteredData = countries.filter(country => country.name.common.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
				if(filteredData.length === 1){
					setFilteredCountries(filteredData);
					setChosenCountry(filteredData[0]);
				} else{
					setFilteredCountries(filteredData);
				}
				
			} else {
				setFilteredCountries([]);
			}
			
		}
	}, [search, countries])

	const handleFilter = (event) =>{
		setSearch(event.target.value);
		setChosenCountry(null);
	}

	const handleSingle = (countryName) =>{
		setChosenCountry(countries.find(country => country.name.common === countryName));
	}

	if(countries)
	{
		return(
			<div>
				<h1>{"Countries app"}</h1>
				<form>
					<h2>{"Look for a country"}</h2>
					<input type="text" onChange={handleFilter}/>
				</form>
				{chosenCountry === null ? 
				(filteredCountries !== null && filteredCountries.length > 10) ? 
					<p>{"Too many matches, specify another filter"} </p> 
					: 
					(filteredCountries !== null && filteredCountries.length === 1) ? 
					<Country country={filteredCountries[0]} weatherData={chosenWeatherData}/> 
					: 
					<Countries countries={filteredCountries} handleSingle={handleSingle}/>
				: 
				<Country country={chosenCountry} weatherData={chosenWeatherData}/>
				}
			</div>
		);
	}
}

export default App;

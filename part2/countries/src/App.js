import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./Countries";
import Country from "./Country";

function App() {
	const [countries, setCountries] = useState(null);
	const [filteredCountries, setFilteredCountries] = useState(null);
	const [search, setSearch] = useState("");
	const [chosenCountry, setChosenCountry] = useState(null);
	const api_key = process.env.REACT_APP_API_KEY

	useEffect(()=>{
		axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
		.then(response => setCountries(response.data));
	}, [])

	useEffect(()=>{
		if(chosenCountry)
			axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${chosenCountry.capitalInfo.latlng[0]}&lon=${chosenCountry.capitalInfo.latlng[1]}&appid=${api_key}`)
			.then(response => console.log(response))
	}, [chosenCountry, api_key])

	useEffect(()=>{
		if(countries)
		{
			if(search !== "")
			{
				setFilteredCountries(countries.filter(country => country.name.common.toLocaleLowerCase().includes(search.toLocaleLowerCase())))
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
					<Country country={filteredCountries[0]}/> 
					: 
					<Countries countries={filteredCountries} handleSingle={handleSingle}/>
				: 
				<Country country={chosenCountry}/>
				}
			</div>
		);
	}
}

export default App;

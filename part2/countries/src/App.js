import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./Countries";
import Country from "./Country";

function App() {
	const [countries, setCountries] = useState(null);
	const [filteredCountries, setFilteredCountries] = useState(null);
	const [search, setSearch] = useState("");

	useEffect(()=>{
		axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
		.then(response => setCountries(response.data));
	}, [])

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
				{(filteredCountries !== null && filteredCountries.length > 10) ? 
					<p>{"Too many matches, specify another filter"} </p> 
					: 
					(filteredCountries !== null && filteredCountries.length === 1) ? 
					<Country country={filteredCountries[0]}/> 
					: 
					<Countries countries={filteredCountries}/>
				}
				
			</div>
		);
	}
}

export default App;

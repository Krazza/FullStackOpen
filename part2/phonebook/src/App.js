import { useState, useEffect } from 'react';
import axios from "axios";
import Filter from './Filter';
import NewPersonForm from './NewPersonForm';
import Persons from './Persons';

const App = () => {
    
    const [persons, setPersons] = useState([]);
    const [filteredPersons, setFilteredPersons] = useState([]);
    const [filter, setFilter] = useState("");
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");

    useEffect(()=>{
        axios
        .get("http://localhost:3001/persons")
        .then(response => setPersons(response.data));
    }, []);

    useEffect(()=>{
        console.log("Updating the filtered array.")
        setFilteredPersons(persons.filter((person) => {
            if(filter === "")
                return person;
            return person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())}));
    }, [filter, persons]);

    const handleNameChange = (event) =>{
        setNewName(event.target.value);
    }

    const handleNumberChange = (event) =>{
        setNewNumber(event.target.value);
    }

    const handleFilter = (event) =>{
        setFilter(event.target.value);

    }

    const SaveNewPerson = (event) =>{
        event.preventDefault();
        if(newName === "" || newNumber === "")
        {
            window.alert(`Fill the missing fields, please.`);
            return;
        }

        const newPerson = {
            name: newName,
            number: newNumber
        }
        
        for(let i = 0; i < persons.length; i++)
        {
            if(PersonObjectComparison(newPerson, persons[i]))
            {
                window.alert(`${event.target.value} is already present in the database.`);
                ClearFields(event);
                break;
            } else{
                setPersons(persons.concat(newPerson));

                ClearFields(event);
            }
        }
    }

    const ClearFields = (event) =>{
        setNewName("");
        setNewNumber("");
        event.target.reset();
    }

    const PersonObjectComparison = (a, b) =>{
        const personA = Object.getOwnPropertyNames(a);
        const personB = Object.getOwnPropertyNames(b);
        
        //same number of fields
        if (personA.length !== personB.length) return false;
        //same fields
        const hasAllKeys = personA.every(value => !!personB.find(v => v === value));
        if (!hasAllKeys) return false;
        //same field values
        for (const key of personA) if (a[key] !== b[key]) return false;

        return true;
    }

    return (
    <div>
        <h1>{"Phonebook"}</h1>
        <h2>{"Filter by name"}</h2>
        <Filter handleFilter={handleFilter} />
        <h2>{"Add a new person"}</h2>
        <NewPersonForm handleNameChange={handleNameChange} SaveNewPerson={SaveNewPerson} handleNumberChange={handleNumberChange}/>
        <h2>{"Numbers"}</h2>
        { filter.length > 0 ? <Persons persons={filteredPersons}/> : <Persons persons={persons}/>}
    </div>)
}

export default App
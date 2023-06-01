import { useState, useEffect } from 'react';
import numberService from './services/numbers';
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
        numberService
        .getAll()
        .then(initialNumbers => setPersons(initialNumbers));
    }, []);

    useEffect(()=>{
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

    const handleDeletion = (event, id) =>{
        if(window.confirm("Do you really wish to delete this user?"))
        {
            numberService
            .erase(id)
            .then(setPersons(persons.filter(person => person.id !== id)));
        }
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

        if(CheckForPresence())
        {
            if(window.confirm(`User ${newPerson.name} already exist in the database, do you wish to update the number?`))
            {
                numberService
                .update((persons.find(person => person.name === newPerson.name)).id, newPerson)
                .then(updatedPerson => setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson)));
                ClearFields(event);
            }
            
        } else {
            numberService
            .create(newPerson)
            .then(updatedPersons => setPersons(persons.concat(updatedPersons)))
            ClearFields(event);
        }

        function CheckForPresence() {
            const target = persons.find((person) => person.name === newPerson.name);
            if( target===undefined )
            {
                return false;
            } else 
                return true;
        }
    }

    const ClearFields = (event) =>{
        setNewName("");
        setNewNumber("");
        event.target.reset();
    }

    return (
    <div>
        <h1>{"Phonebook"}</h1>
        <h2>{"Filter by name"}</h2>
        <Filter handleFilter={handleFilter} />
        <h2>{"Add a new person"}</h2>
        <NewPersonForm handleNameChange={handleNameChange} SaveNewPerson={SaveNewPerson} handleNumberChange={handleNumberChange}/>
        <h2>{"Numbers"}</h2>
        { filter.length > 0 ? <Persons persons={filteredPersons} handleDeletion={handleDeletion}/> : <Persons persons={persons} handleDeletion={handleDeletion}/>}
    </div>)
}

export default App
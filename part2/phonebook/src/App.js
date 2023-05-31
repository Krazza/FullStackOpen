import { useState } from 'react'
import Filter from './Filter';
import NewPersonForm from './NewPersonForm';
import Persons from './Persons';

const App = () => {
    
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ]);

    const [filteredPersons, setFilteredPersons] = useState(persons);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");

    const handleNameChange = (event) =>{
        setNewName(event.target.value);
    }

    const handleNumberChange = (event) =>{
        setNewNumber(event.target.value);
    }

    const handleFilter = (event) =>{
        setFilteredPersons(persons.filter((person) => {
            if(event.target.value === "")
                return person;
            return person.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())}));
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
                setFilteredPersons(filteredPersons.concat(newPerson));
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
        <Persons filteredPersons={filteredPersons}/>
    </div>)
}

export default App
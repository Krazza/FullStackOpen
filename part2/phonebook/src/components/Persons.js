import React from "react";

const Persons = ({persons, handleDeletion}) =>{
    return(<ul>{persons.map(person => <li key={`${person.name} :: ${person.number}`}>{person.name} {person.number}<button onClick={(event) => handleDeletion(event, person.id)}>{"delete"}</button></li>)}</ul>);
}

export default Persons;
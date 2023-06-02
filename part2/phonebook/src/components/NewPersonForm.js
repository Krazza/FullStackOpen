import React from "react";

const NewPersonForm = ({SaveNewPerson, handleNameChange, handleNumberChange}) =>{
    return(
    <form onSubmit={SaveNewPerson}>
        <div>{"Name: "}<input onChange={handleNameChange} /></div>
        <div>{"Number: "}<input onChange={handleNumberChange} /></div>
        <div><button type="submit">{"add"}</button></div>
    </form>)
}

export default NewPersonForm;
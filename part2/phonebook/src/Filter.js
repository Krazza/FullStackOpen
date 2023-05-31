import React from "react";

const Filter = ({handleFilter}) =>{
    return(
        <>
            <input onChange={handleFilter}/>
        </>
    )
}

export default Filter;
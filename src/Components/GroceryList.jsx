import React from 'react'


function GroceryList({title,status,id,togglebtn,deletebtn}) {
    return (
        <div >
            <h2>{title}</h2>
            <p>{status ? "Completed" : "Not Completed"}</p>
            <button  onClick={() => togglebtn(id)}>Toggle</button>
            <button  onClick={() => deletebtn(id)}>Delete</button>
        </div>
    )
}

export {GroceryList}
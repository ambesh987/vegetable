import React from 'react'


function GroceryInput({addList}) {
    var [inp, setInp] = React.useState("")
    function handelInput(e) {
        setInp(e.target.value)
    }
    return (
        <>
            <input  type="text" placeholder='Enter Text' onChange={handelInput} value={inp} />
            <button onClick={() => addList(inp)}>ADD</button>
        </>
    )
}

export { GroceryInput }
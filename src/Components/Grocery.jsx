import React from 'react'
import { GroceryInput } from './GroceryInput'
import { GroceryList } from './GroceryList'
import {v4 as uuid} from "uuid"


function Grocery() {
    const [item, setItem] = React.useState([])
    const [page, setPage] = React.useState(1)
    const [isError, setIsError] = React.useState(false)
    

    function getdata() {
        setIsLoading(true)
        fetch(`http://localhost:3001/todos?_page=${page}&_limit=4`)
        .then((res) => res.json())
        .then((res) => setItem(res))
        .catch(() => setIsError(true))
    }

    React.useEffect(() => {
        getdata();
    },[page])

    function addList(input) {
        var obj = {
            title:input,
            status:false,
            id : uuid()
        }
        const jsonobj = JSON.stringify(obj)
        if(input.length > 2) {
            fetch(`http://localhost:3001/todos`, {
                method : "POST",
                body : jsonobj,
                headers : {
                    "content-type" : "application/json"
                }
            })
            .then((res) => res.json())
            .then(() => getdata())
            .catch((err) => setIsError(true))
            
        } else {
            alert("Add atleast 3 characters")
          
        fetch(`http://localhost:3001/todos?_page=${page}&_limit=4`)
        .then((res) => res.json())
        .then((res) => setItem(res))
        .catch((err) => setIsError(true))
       
        }
    }

    function togglebtn(id) {
        item.map((item) => {
            if(item.id === id) {
                if(item.status === true){
                    fetch(`http://localhost:3001/todos/${id}`,{
                        method : "PATCH",
                        body : JSON.stringify( { status : false } ),
                        headers: {
                            'Content-Type': 'application/json'
                          }
                    })
                    .then(() => getdata())
                } else {
                    fetch(`http://localhost:3001/todos/${id}`,{
                        method : "PATCH",
                        body : JSON.stringify( { status : true } ),
                        headers: {
                            'Content-Type': 'application/json'
                          }
                    })
                    .then(() => getdata())
                }
            }
        })
    }

    function deletebtn(id) {
        fetch(`http://localhost:3001/todos/${id}`,{
            method : "DELETE"
        })
        .then(() => getdata())
    }

    return(
        <div className='container'>
            <GroceryInput addList={addList}/>
            <h1>Todo Lists</h1>
            <div className="App">
                {item.map((item) =>
                    <GroceryList {...item} key={item.id} togglebtn={togglebtn} deletebtn={deletebtn}/>
                )}
            </div>
            <br />
            <br />
            <button className='prev' disabled={page === 1} onClick={() => setPage(page-1)}>Prev</button>
            <button className='next' disabled={item.length < 4} onClick={() => setPage(page+1)}>Next</button>
        </div>
    )
}

export {Grocery}
import React, { useState, useRef, useEffect } from 'react'
import './App.css'
const LOCAL_STORAGE_KEY = 'todoApp.todo'

function App() {
  const todoTextRef = useRef()
  const [todos, setTodos] = useState([])
  const [showCompleted, setShowCompleted] = useState(true)
  const [showDeleted, setShowDeleted] = useState(true)

  const [deletedTodos, setDeletedTodos] = useState([])
  const today = new Date();
  const displayDate = ((today.getDay() < 10)?"0":"") + today.getDay() + "/" + 
                      ((today.getMonth() < 10)?"0":"") + today.getMonth() + "/" +
                      ((today.getFullYear() < 10)?"0":"") + today.getFullYear()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) {
      setTodos(storedTodos.todos)
      setDeletedTodos(storedTodos.deletedTodos)
    }
  }, []) 

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({todos, deletedTodos}))
  }, [todos, deletedTodos])

  function handleButtonClick(e) {
    const text = todoTextRef.current.value
    if (text === '') return
    const time = currentTime()
    setTodos(prevTodos => {
      return[...prevTodos, {id: Date.now(), text: text, time: time, status: false}]
    })
    todoTextRef.current.value = null
  }

  function currentTime() {
    const hours = today.getHours() 
    const hourValue = (hours < 10) & (hours > 0)
    return(displayDate + ",  " +
     ( hourValue ?"0":"") + (today.getHours() === 0 ? 12 : (today.getHours() % 12))+ ":" +
     ((today.getMinutes() < 10)?"0":"") + today.getMinutes() + " "+
     ((today.getHours() >= 12) ? "PM" : "AM")
    )
  }

  function handleFreshPageClick() {
    const confirmation = window.confirm("Click 'OK' if you really need a fresh list")
    if (confirmation) {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
      setTodos([])
      setDeletedTodos([])
    }
  }
    
  return (
    <div className="app">
      <div className="container">
        <div className="add-item">
          <h1 className="app-header">TODO APP</h1>
          <p className="greetings">Hey Buddy, it's
            <span style={{color: 'white'}}> {displayDate}</span>
          </p>
          <div className="input-form">
            <input ref={todoTextRef} type="text" placeholder="&#9997;" className="input-todo"/>
            <button className="btn-add"
                  onClick={ handleButtonClick }
            >&#10133;</button>
          </div>
          <button className="fresh-btn"onClick={handleFreshPageClick}>
            Need a fresh List &#128214;
          </button>
        </div>

        <div className="view-container">    
            
{/*Completed todos here*/}
          <div className="view-section">
            <h2 className="view-section-header">Complete
              <button onClick={()=> setShowCompleted(!showCompleted)}> &#128065;</button>
            </h2>
            {  
              showCompleted ?
                todos.map(todo=> {
                  if (todo.status){
                    return(
                      <div key={todo.id} className="view-card">
                        <p style={
                          {color: "grey"}
                        }
                        >{todo.text}</p>
                        <p className="time">completed on : {todo.time}</p>
                      </div>
                    )  
                  }else {
                    return null
                  }

                })
              : ""
            }
          </div>

{/* Active Todos here */}
            <div className="view-section">
              <h2 className="view-section-header">Active</h2>
              {todos.map(todo=> {
                if (!todo.status){
                  return(
                  <div key={todo.id} className="view-card">
                    <input type="checkbox" checked={todo.status} onChange={(e)=> {
                      const confirmation = window.confirm("Press 'Ok' if you complete it.")
                      if (confirmation) {
                        setTodos(todos.filter(item=>{
                          if (item.id === todo.id) {
                            item.status = e.target.checked
                            item.time = currentTime()
                          }
                          return item
                        }))
                      console.log(todo)
                      }    
                    }
                    }/>
                    <p>{todo.text}</p>
                    <p className="time">
                      created on : {todo.time}
                    </p>
                    <button className="rmv-btn" onClick={(e) => {
                    setDeletedTodos([...deletedTodos, todo])
                    setTodos(todos.filter(item=>{
                      if (item.id !== todo.id) {
                        return item
                      }
                      return null
                    }))
                  }
                  }>&#10006;</button>
                  </div>
                )  
                }
                else {
                  return null
                }
              })
              }
            </div>
{/*Deleted todos are here*/}
          <div className="view-section">
            <h2 className="view-section-header">Delete
              <button onClick={()=> setShowDeleted(!showDeleted)}> &#128065;</button>
            </h2>
            
            { showDeleted ?
                deletedTodos.map(todo=> {
                  console.log("deleted todo", todo)
                    return(
                      <div key={todo.id} className="view-card view-card-deleted">
                        <p className="restore-todo" style={{color: "#80FF00"}} 
                          onClick={(e) =>{
                          setTodos([...todos, todo])
                          setDeletedTodos(deletedTodos.filter(item=>{
                            if (item.id !== todo.id) {
                              return item
                            }
                            return null
                          }))
                          }
                          }
                        >&#x27F2;</p>
                        <p style={
                          {color: "white"}
                        }
                        >{todo.text}</p>
                        <p className="time ">deleted on : {todo.time}</p>
                      </div>
                    )  
                })
              : ""  
            }
          </div>
          

        </div>
      </div>
    </div>
  )
}

export default App
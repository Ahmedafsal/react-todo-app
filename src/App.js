import React, { useState, useRef, useEffect } from 'react'
import './App.css'
const LOCAL_STORAGE_KEY = 'todoApp.todo'

function App() {
  const todoTextRef = useRef()
  const [todos, setTodos] = useState([])
  const [deletedTodos, setDeletedTodos] = useState([])
  const today = new Date();
  const displayDate = today.getDay()+"/"+today.getMonth()+"/"+today.getFullYear()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) {
      setTodos(storedTodos)
      //setDeletedTodos(storedTodos.deletedTodos)
    }
  }, []) 

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

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
    return(today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()
    )
  }
    
  
  return (
    <div className="app">
      <div className="container">
        <div className="add-item">
          <h1 className="app-header">Todo-App</h1>
          <p className="greetings">Hey Buddy, it's
            <span style={{color: 'white'}}> {displayDate}</span>
          </p>
          <div className="input-form">
            <input ref={todoTextRef} type="text" placeholder="&#9997;" className="input-todo"/>
            <button className="btn-add"
                  onClick={ handleButtonClick }
            >Add</button>
          </div>
        </div>

        <div className="view-container">    
         
            <div className="view-section">
              <h2 className="view-section-header">Active</h2>
              {todos.map(todo=> {
                if (!todo.status){
                  return(
                  <div key={todo.id} className="view-card">
                    <input type="checkbox" checked={todo.status} onChange={(e)=> {
                      window.alert("Task Complete")
                      setTodos(todos.filter(item=>{
                        if (item.id === todo.id) {
                          item.status = e.target.checked
                        }
                        return item
                      }))
                      console.log(todo)
                    }
                    }/>
                    <p>{todo.text}</p>
                    <p className="time">
                      <span style={{color: 'maroon', fontSize: '1em'}}>created at </span>
                      {todo.time}
                    </p>
                    <button className="rmv-btn" onClick={(e) => {
                    //setDeletedTodos([...deletedTodos, todo])
                    console.log("deleted todos")
                    console.log(deletedTodos)
                    setTodos(todos.filter(item=>{
                      if (item.id !== todo.id) {
                        return item
                      }
                      return null
                    }))
                    console.log(todo)
                  }
                  }>&#10006;</button>
                  </div>
                )  
                }
              })
              }
            </div>
           
          {/*Completed todos here*/}
          <div className="view-section">
            <h2 className="view-section-header">Completed</h2>
            {todos.map(todo=> {
              if (todo.status){
                return(
                  <div key={todo.id} className="view-card">
                    <input type="checkbox" checked={todo.status} onChange={(e)=> {
                      setTodos(todos.filter(item=>{
                        if (item.id === todo.id) {
                          item.status = e.target.checked
                        }
                        return item
                      }))
                    }
                    }/>
                    <p style={
                      {color: "grey"}
                    }
                    >{todo.text}</p>
                    <p className="time">completed at "----"</p>
                  </div>
                )  
              }
            })
            }
          </div>
          {/*Deleted todos are here*/}
          

        </div>
      </div>
    </div>
  )
}

export default App
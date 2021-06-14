import React, { useState, useEffect } from 'react'
import './App.css';

function App() {
 return(
   <div className="App">
      <div className="container">
        <div className="card input-window">
          <h3>MyTodo-App</h3>
          <p><i>Hello there, It's <span style={{color: 'white'}}>
            "Monday"</span>. Are you ready?</i></p>
          <div>
            <input type="text" />
            <span><button>+</button></span>
          </div>
        </div>
        <div className="output-window">
         <h1>Some content</h1>
        </div>
      </div>
   </div>
 )
}

export default App;

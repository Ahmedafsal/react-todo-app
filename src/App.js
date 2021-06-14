import React, { useState, useEffect } from 'react'
import './App.css';

function App() {
 return(
   <div>
     <div className="input-window">
      <h3>MyTodo-App</h3>
      <p>Hello there, It's "Monday". Are you ready?</p>
      <input type="text" />
      <span><button>+</button></span>
     </div>
     <div className="output-window">

     </div>
     
   </div>
 )
}

export default App;

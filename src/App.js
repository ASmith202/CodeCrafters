// client/src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './Components/NavBar/NavBar';
import Login from './Components/Login/Login';

function App() {

  const portNumber = 8000;
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Make a GET request to the backend
    axios.get(`http://localhost:${portNumber}`)
      .then((response) => {
        setMessage(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, []);

  /*return (
    <div className="App">
      <h1>Message from Backend:</h1>
      <p>{message}</p>
      <p>working with New Components</p>
      <NavBar />
      <Login />
    </div>
  );*/

  return(
    <div className='App'>
        <NavBar />
    </div>
  );
}

export default App;

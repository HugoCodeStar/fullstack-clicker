import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [click, setClick] = useState(null);

  const handleClick = () => {
    setClick(click + 1);
    fetch('http://localhost:3000/clicks', {
      method: 'post',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      body: JSON.stringify({data: 'I like cookies'})
    })
    .then(res => res.json())
    .then(({clicks}) => setClick(clicks))
  }

  useEffect(() => {
    fetch('http://localhost:3000/clicks')
    .then(response => response.json())
    .then(({clicks}) => setClick(clicks))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Click is {click}
        </p>
        <button onClick={handleClick}>Click</button>
      </header>
    </div>
  );
}

export default App;

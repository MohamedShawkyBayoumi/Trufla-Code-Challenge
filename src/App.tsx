import React, { useEffect } from 'react';
import './App.css';
import Home from './pages/Home';

function App() {

  const getData = async () => {
    try {
      let response = await fetch("http://localhost:8000/data");
      let result = await response.json();
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="app">
      <Home />
    </div>
  );
}

export default App;

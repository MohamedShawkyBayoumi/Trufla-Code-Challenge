import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './pages/Home';

type Users = {
  id: number;
  name: string;
  following: number[];
  interests?: number[];
}

type Interests = {
  id: number;
  name: string;
}

export interface DataTypes {
  users: Array<Users>;
  interests: Array<Interests>;
}

function App() {

  const [users, setUsers] = useState<Users[]>([]);
  const [interests, setInterests] = useState<Interests[]>([]);

  const getData = async () => {
    try {
      let response = await fetch("http://localhost:8000/data");
      let result = await response.json() as DataTypes;
      setUsers(result?.users);
      setInterests(result?.interests);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="app">
      <Home users={users} interests={interests} />
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './pages/Home';

export type Users = {
  id: number;
  name: string;
  following: number[];
  interests?: number[];
  interestsData?: Interests[];
}

export type TransformedUsers = {
  id: number;
  name: string;
  following: number[];
  interests?: Interests[];
}

export type Interests = {
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

      const usersResult = [...result?.users];
      const usersInterests = [...result?.interests];

      let transformedUsers = usersResult.map((user) => {

        let filteredInterests = usersInterests.filter((interest) => user?.interests?.find((i: number) => i == interest.id));

        let transformedUser = {
          ...user,
          interestsData: filteredInterests
        }

        return transformedUser;
      });

      setUsers(transformedUsers);

    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="app">
      <Home users={users} setUsers={setUsers} />
    </div>
  );
}

export default App;

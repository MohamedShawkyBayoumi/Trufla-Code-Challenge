import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './pages/Home';

export type Users = {
  id: number;
  name: string;
  following: number[];
  interests?: number[];
  interestsData?: Interests[];
  followers: number;
}

export type Interests = {
  id: number;
  name: string;
}

export interface DataTypes {
  users: Array<Users>;
  interests: Array<Interests>;
}

interface FollowerCountsTypes {
  [key: string]: number
}

function App() {
  const [users, setUsers] = useState<Users[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const getData = async () => {
    try {
      setIsLoading(true);
      let response = await fetch("http://localhost:8000/data");
      let result = await response.json() as DataTypes;

      const usersResult = [...result?.users];
      const usersInterests = [...result?.interests];

      let followerCounts: FollowerCountsTypes = {};

      let transformedUsers = usersResult.map((user) => {

        // to match the user interest from the other array of interests
        let filteredInterests = usersInterests.filter((interest) => user?.interests?.find((i: number) => i === interest.id));

        // to keep track of followers
        user.following.forEach((follower) => {
          if(followerCounts[follower]){
            followerCounts[follower]++
          } else {
            followerCounts[follower] = 1;
          }
        });

        let transformedUser = {
          ...user,
          interestsData: filteredInterests
        }

        return transformedUser;
      });

      // map through the transformedUsers to append followers count for each user
      const usersWithFollowers = transformedUsers.map((user) => ({ ...user, followers: followerCounts[user.id] ?? 0 }));

      const sortedUsers = usersWithFollowers.sort((n1, n2) => n2.followers - n1.followers);

      setUsers(sortedUsers);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="app">
      <Home
        users={users}
        setUsers={setUsers}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}

export default App;

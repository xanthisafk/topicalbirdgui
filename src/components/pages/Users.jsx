import React from 'react';
import { useParams } from 'react-router-dom';

const Users = () => {
  const { username } = useParams();
  return (
    <h1>User {username}'s Page</h1>
  );
};

export default Users;
import React from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { username } = useParams();
  return (
    <h1>Profile Page for: {username}</h1>
  );
};

export default Profile;
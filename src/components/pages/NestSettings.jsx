import React from 'react';
import { useParams } from 'react-router-dom';

const NestSettings = () => {
  const { slug } = useParams();
  return (
    <h1>Nest Settings Page for: {slug}</h1>
  );
};

export default NestSettings;
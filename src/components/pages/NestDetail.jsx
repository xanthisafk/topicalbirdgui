import React from 'react';
import { useParams } from 'react-router-dom';

const NestDetail = () => {
  const { slug } = useParams();
  return (
    <h1>Nest Detail Page: {slug}</h1>
  );
};

export default NestDetail;
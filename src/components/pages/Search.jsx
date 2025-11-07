import React from 'react';
import { useParams } from 'react-router-dom';

const Search = () => {
  const { query } = useParams();
  return (
    <h1>
      You searched for: {query ?? "Nothing!"}
    </h1>
  );
};

export default Search;
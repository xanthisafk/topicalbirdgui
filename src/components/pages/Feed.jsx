import { LOCALSTORAGE_KEYS } from '@/config';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Feed = () => {
  const [ searchParams ] = useSearchParams();
  const pageNo = searchParams.get("page") ?? 1;
  const limit = Number.parseInt(localStorage.getItem(LOCALSTORAGE_KEYS.feedLimit)) || 20;
  return (
    <h1>
      Feed Page<br />
      page: {pageNo}<br />
      limit: {limit}<br />
    </h1>
  );
};

export default Feed;
import { LOCALSTORAGE_KEYS } from '@/config';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Feed = () => {
  const [ searchParams ] = useSearchParams();
  const pageNo = searchParams.get("page") ?? 1;
  const limit = Number.parseInt(localStorage.getItem(LOCALSTORAGE_KEYS.feedLimit)) || 20;
  return (
    <h1>
      Feed Page
      page: {pageNo}
      limit: {limit}
    </h1>
  );
};

export default Feed;
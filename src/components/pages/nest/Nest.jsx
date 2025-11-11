import React, { useEffect, useState } from 'react';
import ContentLoading from '@/components/ContentLoading';
import NoContent from '@/components/NoContent';
import { getAllNests } from '@/helpers';
import { LOCALSTORAGE_KEYS, NAVIGATION_PAGES } from '@/config';
import NestCard from '@/components/NestCard';
import Pagination from '@/components/Pagination';
import { useSearchParams } from 'react-router-dom';


import "@/styles/pages/nests/nest-index.css";

const Nest = () => {
  const [searchParams] = useSearchParams();
  
  const [loading, setLoading] = useState(true);
  const [nests, setNests] = useState([]);
  const [currentUser, setCurrentUser] = useState({id: null});
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    totalPages: 1,
    totalItems: 1,
    limit: 20,
  });

  const fetchNests = async () => {
    const res = await getAllNests(searchParams.get("page") || pagination.pageNumber || 1, 20);
    if (res.status === 200) {
      setNests(res.content.nests);
      setPagination(res.content.pagination);
    }
  }

  const fetchCurrentUser = () => {
    let user = { id: null };
    try {
      const data = localStorage.getItem(LOCALSTORAGE_KEYS.currentUser);
      if (data) {
        user = JSON.parse(data);
      }
    } finally {
      setCurrentUser(user);
    }
  }

  const fetchData = async () => {
    try {
      setLoading(true);
      fetchCurrentUser();
      await fetchNests();
      } finally {
        setLoading(false);
      }
  }

  useEffect(() => {

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  const noNestButton = {
    href: NAVIGATION_PAGES.nests.newNest,
    direction: "forwards",
    label: "Create a new nest!"
  }

  if (loading) return <ContentLoading size={64} />
  if (nests.length <= 0) return <NoContent what='nests' action={noNestButton} />
  return (
    <>
    <h3>Browse Nests</h3>
    {
      nests && nests.map((item, index) => (
        <NestCard nest={item} mod={item.moderator.id === currentUser.id} key={index} />
      ))
    }
    <Pagination data={pagination} />
    </>
  );
};

export default Nest;
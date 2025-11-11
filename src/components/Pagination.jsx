import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './ui/Button';
import { useViewNavigate } from '@/helpers';

import "@/styles/components/pagination.css";

const Pagination = ({ data }) => {
    const { pageNumber, totalPages } = data;
    const navigate = useViewNavigate();

    // Don't render pagination if there's only one page or no pages
    if (totalPages <= 1) {
        return null;
    }

    // Calculate page numbers
    const prevPage = pageNumber - 1;
    const nextPage = pageNumber + 1;

    // Determine if "prev" or "next" buttons should be shown
    const hasPrev = pageNumber > 1;
    const hasNext = pageNumber < totalPages;

    const getPageUrl = (page) => {
        const url = new URL(window.location);
        url.searchParams.set('page', page);
        return url.search;
    };

    return (
        <nav className="pagination-container" aria-label="pagination">

            {hasPrev && (
                <Button
                    onClick={() => navigate(getPageUrl(prevPage), "back")}
                    className="pagination-item pagination-arrow"
                    aria-label="Go to previous page"
                    variant='primary'
                >
                    <ChevronLeft />
                </Button>
            )}


            {hasPrev && (
                <Button
                    onClick={() => navigate(getPageUrl(prevPage), "back")}
                    className="pagination-item"
                    aria-label={`Go to page ${prevPage}`}
                    variant="outlined"
                >
                    {prevPage}
                </Button>
            )}


            <Button
                onClick={() => navigate(getPageUrl(pageNumber), "forwards")}
                className="pagination-item active"
                aria-current="page"
                aria-label={`Current page, page ${pageNumber}`}
                variant='secondary'
            >
                {pageNumber}
            </Button>


            {hasNext && (
                <Button
                    onClick={() => navigate(getPageUrl(nextPage), "forwards")}
                    className="pagination-item"
                    aria-label={`Go to page ${nextPage}`}
                    variant='outlined'
                >
                    {nextPage}
                </Button>
            )}

            {hasNext && (
                <Button
                    onClick={() => navigate(getPageUrl(nextPage), "forwards")}
                    className="pagination-item pagination-arrow"
                    aria-label="Go to next page"
                    variant='primary'
                >
                    <ChevronRight />
                </Button>
            )}
        </nav>
    );
};

export default Pagination;
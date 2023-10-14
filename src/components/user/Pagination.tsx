
"use client";

import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Pagination = () => {
  const { state, handlePageChange } = useContext(UserContext);

  const totalPages = state.totalPages;
  const currentPage = state.currentPage;

  const handlePrevPage = () => {
    handlePageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    handlePageChange(currentPage + 1);
  };

  return (
    <div>
      <button disabled={currentPage === 1} onClick={handlePrevPage}>
        Prev
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button disabled={currentPage === totalPages} onClick={handleNextPage}>
        Next
      </button >
           </div>
    );
};

export default Pagination;
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ pageCount, onPageChange }) => {

  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={onPageChange}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      containerClassName={'flex justify-center mt-8'}
      activeClassName={'bg-sky-500 text-white px-2 py-1.5'}
      pageClassName={'mx-2 cursor-pointer transition-all duration-300 hover:bg-sky-500 hover:text-white px-2 py-1.5'}
      breakClassName={'mx-2 text-gray-600'}
      previousClassName={'mx-2 text-sky-500 cursor-pointer px-2 py-1.5'}
      nextClassName={'mx-2 text-sky-500 cursor-pointer px-2 py-1.5'}
      disabledClassName={'mx-2 text-gray-300 cursor-not-allowed'}
    />
  );
};

export default Pagination;

import React from 'react';

const Pagination = ({ pageCount, currentPage, onPageChange, pageRange = 2 }) => {
  const rangeToShow = pageRange * 2 + 1;
  let startPage = Math.max(1, currentPage - pageRange);
  let endPage = Math.min(pageCount, startPage + rangeToShow - 1);

  if (endPage - startPage + 1 < rangeToShow) {
    startPage = Math.max(1, endPage - rangeToShow + 1);
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  return (
    <div className="flex justify-center space-x-2">
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-2 border border-gray-300 rounded-md transition duration-300 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
        >
          Previous
        </button>
      )}

      {startPage > 1 && (
        <button
          onClick={() => onPageChange(1)}
          className={`px-3 py-2 border border-gray-300 rounded-md transition duration-300 ease-in-out ${
            currentPage === 1 ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300'
          }`}
        >
          1
        </button>
      )}

      {startPage > 2 && (
        <span className="px-3 py-2">...</span>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 border border-gray-300 rounded-md transition duration-300 ease-in-out ${
            currentPage === page ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300'
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < pageCount - 1 && (
        <span className="px-3 py-2">...</span>
      )}

      {endPage < pageCount && (
        <button
          onClick={() => onPageChange(pageCount)}
          className={`px-3 py-2 border border-gray-300 rounded-md transition duration-300 ease-in-out ${
            currentPage === pageCount ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300'
          }`}
        >
          {pageCount}
        </button>
      )}

      {currentPage < pageCount && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-2 border border-gray-300 rounded-md transition duration-300 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;

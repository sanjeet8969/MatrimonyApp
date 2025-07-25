import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  showInfo = true,
  showFirstLast = true,
  maxVisiblePages = 5,
  className = ''
}) => {
  const getVisiblePages = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {showInfo && (
        <div className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </div>
      )}
      
      <div className="flex items-center space-x-2">
        {/* First Page */}
        {showFirstLast && currentPage > 1 && (
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            First
          </button>
        )}

        {/* Previous Page */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Page Numbers */}
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
              page === currentPage
                ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next Page */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Last Page */}
        {showFirstLast && currentPage < totalPages && (
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Last
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const maxPages = Math.min(totalPages, 500);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(maxPages, startPage + maxVisible - 1);
    
    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handlePageClick = (page) => {
    if (page >= 1 && page <= maxPages && page !== currentPage) {
      onPageChange(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="pagination-container">
      <button
        className="page-btn"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous Page"
      >
        <ChevronLeft size={18} />
      </button>

      {getPageNumbers().map((page) => (
        <button
          key={page}
          className={`page-btn ${page === currentPage ? 'active' : ''}`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}

      {currentPage + 2 < maxPages && (
        <span style={{ margin: '0 4px', color: 'var(--text-muted)' }}>...</span>
      )}

      <button
        className="page-btn"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage >= maxPages}
        aria-label="Next Page"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

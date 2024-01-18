import React from 'react'
import './css/pagination.css'

export function Pagination({ feed, setPage }) {
    const paginationNumbers = []
    for (let i = 1; i <= feed.total_pages; i++) {
        paginationNumbers.push(i)
    }
    const handlePage = (pageNumber) => {
        if (pageNumber !== feed.current_page){
            setPage(pageNumber)
        } 
    }

    return (
        <div className='pagination'>
            {paginationNumbers.map((pageNumber, index) => (
                <button 
                className={feed.current_page === index + 1 ? 'currentPage' : ''}
                key={pageNumber}
                onClick={() => handlePage(pageNumber)}
                >
                    {pageNumber}
                </button>
            ))}
        </div>
    )
}


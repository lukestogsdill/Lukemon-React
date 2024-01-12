import React from 'react'

export function Pagination({ feed , getFeed }) {
    const paginationNumbers = []
    for (let i = 1; i <= feed.total_pages; i++) {
        paginationNumbers.push(i)
    }
    const handlePage = (pageNumber) => {
        console.log('pageNum' + pageNumber)
        getFeed(pageNumber, 1)
    }

    return (
        <div>
            {paginationNumbers.map((pageNumber) => (
                <button 
                key={pageNumber}
                onClick={() => handlePage(pageNumber)}
                >
                    {pageNumber}
                </button>
            ))}
        </div>
    )
}


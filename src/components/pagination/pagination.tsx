import React, {useState} from 'react';
import s from './pagination.module.css'

type Props = {
    totalPages: number
    updatePage: (pageNumber: number) => void
}
export const Pagination = ({totalPages, updatePage}: Props) => {

    const [currentPage, setCurrentPage] = useState(1)

    const pageNumbers = []

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    const handleClick = (pageNumber: number) => {
        updatePage(pageNumber)
        setCurrentPage(pageNumber)
    }
    return (
        <nav className={s.paginationContainer}>
                {pageNumbers.map(number => (
                    <button onClick={() => handleClick(number)}
                            className={`${s.paginationButton} ${currentPage === number ? s.active : ''}`}
                    key={number}>
                        {number}
                    </button>
                ))}
        </nav>
    )
}


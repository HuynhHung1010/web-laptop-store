import React from 'react'

const Pagination = ({ products, paginate, postsPerPage, currentPage }) => {
    const totalPosts = products.length;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }


    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map((number) => (
                    <li key={number} className="pagination__item">
                        <button onClick={() => paginate(number)} className={`pagination__item__btn ${currentPage === number ? 'active' : ''}`}>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination

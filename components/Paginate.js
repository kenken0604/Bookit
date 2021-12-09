import React from 'react'
import Link from 'next/link'

const Paginate = ({ pageNumber, pageSize, roomsCount, keyword }) => {
  const pages = Math.ceil(roomsCount / pageSize)
  return (
    <ul className="pagination">
      <Link
        href={keyword ? `/?location=${keyword}&pageNumber=1` : `/?pageNumber=1`}
      >
        <li className={`page-item ${pageNumber === 1 ? 'disabled' : ''}`}>
          <a
            className="page-link"
            aria-disabled={pageNumber === 1 ? 'true' : 'false'}
          >
            <i className="fas fa-angle-double-left"></i>
          </a>
        </li>
      </Link>
      {[...Array(pages).keys()].map((x) => (
        <Link
          key={x + 1}
          href={
            keyword
              ? `/?location=${keyword}&pageNumber=${x + 1}`
              : `/?pageNumber=${x + 1}`
          }
        >
          <li className={`page-item ${x + 1 === pageNumber ? 'active' : ''}`}>
            <a className="page-link">{x + 1}</a>
          </li>
        </Link>
      ))}
      <Link
        href={
          keyword
            ? `/?location=${keyword}&pageNumber=${pages}`
            : `/?pageNumber=${pages}`
        }
        disabled={pageNumber === pages}
      >
        <li className={`page-item ${pageNumber === pages ? 'disabled' : ''}`}>
          <a
            className="page-link"
            aria-disabled={pageNumber === pages ? 'true' : 'false'}
          >
            <i className="fas fa-angle-double-right"></i>
          </a>
        </li>
      </Link>
    </ul>
  )
}

export default Paginate

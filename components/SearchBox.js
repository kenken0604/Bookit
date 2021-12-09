import React, { useState } from 'react'
import { useRouter } from 'next/router'

const SearchBox = () => {
  const router = useRouter()
  const [keyword, setKeyword] = useState('')
  const [guest, setGuest] = useState('')
  const [category, setCategory] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      router.push(
        `/?location=${keyword}&guestCapacity=${guest}&category=${category}`,
      )
    } else {
      router.push('/')
    }
  }

  return (
    <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-6 co1-lg-5">
          <form className="shadow" onSubmit={submitHandler}>
            <h2 className="mb-3">Search Rooms</h2>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                className="form-control"
                itemID="location"
                placeholder="New York"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">No. of Guests</label>
              <select
                className="form-control"
                id="guest"
                value={guest}
                onChange={(e) => setGuest(e.target.value)}
              >
                {[1, 2, 3, 4, 5, 6].map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="roomType">Room Type</label>
              <select
                className="form-control"
                id="roomType"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {['King', 'Single', 'Twins'].map((cate, index) => (
                  <option key={index} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn px-4 py-2">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SearchBox

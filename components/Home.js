import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import { clearErrors } from '../redux/actions/roomActions'
import { toast } from 'react-toastify'
import Pagination from 'react-js-pagination'

import RoomItem from './room/RoomItem'

const Home = () => {
  const dispatch = useDispatch()
  const { rooms, error, roomCount, pageSize } = useSelector(
    (state) => state.roomsList,
  )
  const router = useRouter()

  let { page = 1 } = router.query
  page = Number(page)

  useEffect(() => {
    if (error) {
      toast.error('We have problem here...')
      dispatch(clearErrors())
    }
  }, [error])

  const pageHandler = (pageNumber) => {
    router.push(`/?page=${pageNumber}`)
  }

  return (
    <section className="container mt-5">
      <h2 className="mb-3 ml-2 stays-heading">Stays in New York</h2>
      <a href="#" className="ml-2 back-to-search">
        <i className="fa fa-arrow-left"></i> Back to Search
      </a>
      <div className="row">
        {rooms && rooms.length > 0 ? (
          rooms && rooms.map((room) => <RoomItem key={room._id} room={room} />)
        ) : (
          <div className="alert alert-danger">No Room Found</div>
        )}
      </div>
      <div className="d-flex justify-content-center mt-5">
        <Pagination
          activePage={page}
          itemsCountPerPage={pageSize}
          totalItemsCount={roomCount}
          onChange={pageHandler}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    </section>
  )
}

export default Home

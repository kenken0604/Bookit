import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { clearErrors } from '../redux/actions/roomActions'
import { toast } from 'react-toastify'
import Paginate from './Paginate'

import RoomItem from './room/RoomItem'

const Home = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { rooms, error, roomsCount, pageSize, pageNumber } = useSelector(
    (state) => state.roomsList,
  )
  const { location } = router.query

  useEffect(() => {
    if (error) {
      toast.error('We have problem here...')
      dispatch(clearErrors())
    }
  }, [error])

  return (
    <section className="container mt-5 min-height-80">
      <h2 className="mb-3 ml-2 stays-heading">
        {location ? `Stay in ${location}` : 'All Rooms'}
      </h2>
      <Link href="/search">
        <a className="ml-2 back-to-search">
          <i className="fa fa-arrow-left"></i> Back to Search
        </a>
      </Link>
      <div className="row">
        {rooms && rooms.length > 0 ? (
          rooms && rooms.map((room) => <RoomItem key={room._id} room={room} />)
        ) : (
          <div className="alert alert-danger d-block mx-4 mt-3 w-100">
            No Room Found
          </div>
        )}
      </div>
      <div className="d-flex justify-content-center mt-5">
        {roomsCount > pageSize && (
          <Paginate
            keyword={location}
            pageNumber={pageNumber}
            pageSize={pageSize}
            roomsCount={roomsCount}
          />
        )}
      </div>
    </section>
  )
}

export default Home

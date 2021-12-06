import React, { useEffect } from 'react'
import RoomItem from './room/RoomItem'

import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const HomePage = () => {
  const { rooms } = useSelector((state) => state.roomsList)

  useEffect(() => {
    if (rooms) {
      toast.success('Room List successfully imported')
    } else {
      toast.error('We have problem here...')
    }
  }, [])

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
    </section>
  )
}

export default HomePage

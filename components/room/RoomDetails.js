import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors } from '../../redux/actions/roomActions'
import Image from 'next/image'

import { Carousel } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Rating from '../room/Rating'
import RoomFeatures from './RoomFeatures'

const RoomDetails = () => {
  const dispatch = useDispatch()
  const { room } = useSelector((state) => state.roomDetails)

  useEffect(() => {
    if (room) {
      toast.success('Room details successfully imported')
    } else {
      toast.error('We have errors here...')
      dispatch(clearErrors())
    }
  }, [room])
  return (
    <div>
      <div className="container container-fluid">
        <h2 className="mt-5">{room.name}</h2>
        <p>{room.address}</p>
        <p className="text-right">
          <Rating value={room.ratings} />
          {room.numOfReviews} Reviews
        </p>
        <Carousel hover="pause">
          {room &&
            room.images.map((image) => (
              <Carousel.Item
                key={image.public_id}
                style={{ width: '100%', height: '440px' }}
              >
                <Image
                  className="d-block m-0 object-fit"
                  src={image.url}
                  alt={room.name}
                  layout="fill"
                />
              </Carousel.Item>
            ))}
        </Carousel>
        <div className="row my-5">
          <div className="col-12 col-md-6 col-lg-8">
            <h3>Description</h3>
            <p>{room.description}</p>
            <RoomFeatures room={room} />
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="booking-card shadow p-4">
              <p className="price-per-night">
                <b>${room.pricePerNight}</b>
                <small> /night</small>
              </p>
              <button className="btn btn-block py-2 booking-btn">Pay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomDetails

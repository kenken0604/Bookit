import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { Carousel } from 'react-bootstrap'
import { toast } from 'react-toastify'
import ButtonLoader from '../ButtonLoader'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import Rating from '../room/Rating'
import RoomFeatures from './RoomFeatures'
import { clearErrors } from '../../redux/actions/roomActions'
import { createNewBooking } from '../../redux/actions/bookingActions'

const RoomDetails = () => {
  const [checkInDate, setcheckInDate] = useState()
  const [checkOutDate, setCheckOutDate] = useState()
  const [daysOfStay, setDaysOfStay] = useState()

  const router = useRouter()
  const dispatch = useDispatch()
  const { room } = useSelector((state) => state.roomDetails)
  const { loading, success, error } = useSelector(
    (state) => state.bookingCreate,
  )

  useEffect(() => {
    if (!room) {
      toast.error('We have errors here...')
      dispatch(clearErrors())
    }

    if (success) {
      toast.success('Your booking is done.')
    }

    if (error) {
      toast.error(error)
    }
  }, [room, success, error])

  const onChange = (dates) => {
    const [checkInDate, checkOutDate] = dates

    setcheckInDate(checkInDate)
    setCheckOutDate(checkOutDate)
    if (checkInDate && checkOutDate) {
      const days = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24) + 1
      setDaysOfStay(days)
    }
  }

  const roomID = router.query.id
  const amountPaid = room.pricePerNight * daysOfStay

  const detail = {
    roomID,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo: {
      id: 'STRIPE_PAYMENT_ID',
      status: 'STRIPE_PAYMENT_STATUS',
    },
  }

  const bookingHandler = () => {
    dispatch(createNewBooking(detail))
  }

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

              <hr />

              <p className="mt-5 mb-3">Pick Check In & Check Out Date</p>
              <DatePicker
                className="w-100"
                selected={checkInDate}
                onChange={onChange}
                startDate={checkInDate}
                endDate={checkOutDate}
                selectsRange
                inline
              />
              <button
                className="btn btn-block py-2 booking-btn"
                onClick={bookingHandler}
              >
                {loading ? <ButtonLoader /> : 'PAY'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomDetails

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
import {
  checkBookedDate,
  checkBooking,
  createNewBooking,
} from '../../redux/actions/bookingActions'
import NewReview from '../reviews/NewReview'
import ListReview from '../reviews/ListReview'

const RoomDetails = () => {
  const [checkInDate, setcheckInDate] = useState()
  const [checkOutDate, setCheckOutDate] = useState()
  const [daysOfStay, setDaysOfStay] = useState()

  const router = useRouter()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.userProfile)
  const { room } = useSelector((state) => state.roomDetails)
  const { loading, success, error } = useSelector(
    (state) => state.bookingCreate,
  )
  const { isAvailable } = useSelector((state) => state.bookingCheck)
  const { dates } = useSelector((state) => state.bookedDate)

  const roomID = router.query.id

  let excludedDates = []
  dates.forEach((date) => {
    excludedDates.push(new Date(date)) //換成新日期格式
  })

  // console.log(dates)
  // console.log(excludedDates)

  useEffect(() => {
    if (!room) {
      toast.error('We have errors here...')
      dispatch(clearErrors())
    }

    if (success) {
      toast.success('Your booking is done.')
      router.push('/bookings/me')
    }

    if (error) {
      toast.error(error)
    }

    dispatch(checkBookedDate(roomID))
  }, [room, success, error, roomID])

  const onChange = (dates) => {
    const [checkInDate, checkOutDate] = dates

    setcheckInDate(checkInDate)
    setCheckOutDate(checkOutDate)
    if (checkInDate && checkOutDate) {
      const days = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24) + 1
      setDaysOfStay(days)

      dispatch(checkBooking(roomID, checkInDate, checkOutDate))
    }
  }

  const amountPaid = room.pricePerNight * daysOfStay

  const detail = {
    roomID,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo: {
      id: 'STRIPE_PAYMENT_ID', //暫時資料
      status: 'STRIPE_PAYMENT_STATUS',
    },
  }

  const bookingHandler = () => {
    dispatch(createNewBooking(detail))
  }

  return (
    <div>
      <div className="container">
        <button className="btn btn-danger mt-5" onClick={() => router.back()}>
          Go Back
        </button>
        <h2 className="mt-5">{room.name}</h2>
        <p>{room.address}</p>
        <p className="text-right">
          <Rating value={room.ratings} />
          {room.numOfReviews} {room.numOfReviews > 1 ? 'Reviews' : 'Review'}
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
          <div className="col-12 col-md-6 col-lg-4 mt-5">
            <div className="booking-card shadow p-4">
              <p className="price-per-night">
                <b>${room.pricePerNight}</b>
                <small> /night</small>
              </p>

              <hr />

              <p className="my-3">Pick Check In & Check Out Date</p>
              <DatePicker
                className="w-100"
                selected={checkInDate}
                onChange={onChange}
                startDate={checkInDate}
                endDate={checkOutDate}
                minDate={new Date()}
                excludeDates={excludedDates}
                selectsRange
                inline
              />

              {isAvailable === true && (
                <div className="alert alert-success my-3 font-weight-bold text-center">
                  Room is available. <p className="my-0">Book it right now.</p>
                </div>
              )}

              {isAvailable === false && (
                <div className="alert alert-danger my-3 font-weight-bold text-center">
                  Room is not available.{' '}
                  <p className="my-0">Please try different dates.</p>
                </div>
              )}

              {isAvailable && !user && (
                <div className="alert alert-danger my-3 font-weight-bold text-center">
                  Login to book room.
                </div>
              )}

              {isAvailable && user && (
                <button
                  className="btn btn-block py-2 booking-btn"
                  onClick={bookingHandler}
                >
                  {loading ? (
                    <ButtonLoader />
                  ) : (
                    `PAY - $${room.pricePerNight * daysOfStay}`
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-8">
            <NewReview />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-8">
            <ListReview reviews={room.reviews} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomDetails

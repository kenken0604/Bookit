import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'

import { toast } from 'react-toastify'
import { CLEAR_ERRORS } from '../../redux/constants/bookingConstants'

const BookingDetails = () => {
  const dispatch = useDispatch()
  const { booking, error } = useSelector((state) => state.bookingDetails)

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch({ type: CLEAR_ERRORS })
    }
  }, [dispatch, error])
  return (
    <div className="container">
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 booking-details">
          <Link href="/bookings/me">
            <button className="btn btn-danger">Go Back</button>
          </Link>
          <h2 className="mt-0 my-4">Booking #{booking._id}</h2>
          <h4 className="mb-4">Client Info</h4>
          <p>
            <b>Name: </b>
            {booking.user.name}
          </p>
          <p>
            <b>Email: </b>
            {booking.user.email}
          </p>
          <p>
            <b>Amount: </b>${booking.amountPaid}
          </p>

          <hr />

          <h4 className="mb-4">Booking Info</h4>
          <p>
            <b>Check In: </b>
            {new Date(booking.checkInDate).toLocaleDateString()}
          </p>
          <p>
            <b>Check Out: </b>
            {new Date(booking.checkOutDate).toLocaleDateString()}
          </p>
          <p>
            <b>Days of Stay: </b>
            {booking.daysOfStay} Days
          </p>

          <hr />

          <h4 className="mb-4">Payment Status</h4>
          <p className="greenColor">
            <b>Paid</b>
          </p>

          <hr />
          <div className="cart-item my-1">
            <div className="row my-5 px-3">
              <div className="col-4 col-lg-3">
                <Image
                  src={booking.room.images[0].url}
                  alt={booking.room.name}
                  layout="fill"
                  className="object-fit"
                />
              </div>
              <div className="col-5 col-lg-4">
                <Link href={`/room/${booking.room._id}`}>
                  {booking.room.name}
                </Link>
              </div>

              <div className="col-4 col-lg-2 mt-4 mt-lg-0 text-center font-weight-bold">
                <p>${booking.room.pricePerNight}</p>
              </div>

              <div className="col-4 col-lg-3 mt-4 mt-lg-0 text-center font-weight-bold">
                <p>{booking.daysOfStay} Days</p>
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </div>
  )
}

export default BookingDetails

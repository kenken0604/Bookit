import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

import { toast } from 'react-toastify'
import { CLEAR_ERRORS } from '../../redux/constants/bookingConstants'

const BookingDetails = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { booking, error } = useSelector((state) => state.bookingDetails)
  const { user } = useSelector((state) => state.userProfile)

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch({ type: CLEAR_ERRORS })
    }
  }, [dispatch, error])
  return (
    <div className="container">
      <div className="row wrapper">
        <div className="col-12 booking-details">
          <button className="btn btn-danger" onClick={() => router.back()}>
            Go Back
          </button>
          <h2 className="mt-5 my-4 text-truncate">Booking #{booking._id}</h2>
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
              <div className="col-12 col-sm-12 col-lg-4 my-3 my-lg-0 text-center">
                <Image
                  src={booking.room.images[0].url}
                  alt={booking.room.name}
                  height={100}
                  width={250}
                  className="object-fit"
                />
              </div>
              <div className="col-12 col-sm-12 col-lg-4 my-3 my-lg-0 text-center">
                <Link href={`/room/${booking.room._id}`}>
                  {booking.room.name}
                </Link>
              </div>

              <div className="col-12 col-sm-12 col-lg-2 my-3 my-lg-0 text-center">
                <p>${booking.room.pricePerNight * booking.daysOfStay}</p>
              </div>

              <div className="col-12 col-sm-12 col-lg-2 my-3 my-lg-0 text-center">
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

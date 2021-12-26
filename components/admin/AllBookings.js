import React, { useEffect } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import Loader from '../layout/Loader'
import { MDBDataTable } from 'mdbreact'
import { toast } from 'react-toastify'
import { CLEAR_ERRORS } from '../../redux/constants/bookingConstants'
import {
  getAdminBookinglist,
  adminDeleteBooking,
} from '../../redux/actions/bookingActions'

const AllBookings = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { loading, bookings, error } = useSelector(
    (state) => state.adminBookinglist,
  )
  const { deleteLoading, deleteSuccess, deleteError } = useSelector(
    (state) => state.bookingDelete,
  )

  useEffect(() => {
    dispatch(getAdminBookinglist())

    if (error) {
      toast.error(error)
      dispatch({ type: CLEAR_ERRORS })
    }
    if (deleteError) {
      toast.error(deleteError)
      dispatch({ type: CLEAR_ERRORS })
    }

    if (deleteSuccess) {
      router.push('/admin/adminBookingList')
    }
  }, [dispatch, error, deleteError, deleteSuccess])

  const setAllBookings = () => {
    const data = {
      columns: [
        {
          label: 'Booking ID',
          field: 'id',
          sort: 'asc', //升序排列
        },
        {
          label: 'Check In',
          field: 'checkIn',
          sort: 'asc',
        },
        {
          label: 'Check Out',
          field: 'checkOut',
          sort: 'asc',
        },
        {
          label: 'Amount Paid',
          field: 'amount',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
          sort: 'asc',
        },
      ],
      rows: [],
    }
    bookings &&
      bookings.map((booking) =>
        data.rows.push({
          id: booking._id,
          checkIn: new Date(booking.checkInDate).toLocaleDateString(),
          checkOut: new Date(booking.checkOutDate).toLocaleDateString(),
          amount: '$' + booking.amountPaid,
          actions: (
            <div>
              <Link href={`/admin/bookings/${booking._id}`}>
                <a className="btn btn-sm btn-primary mr-2 mb-sm-2 mb-lg-0">
                  <i className="fas fa-edit"></i>
                </a>
              </Link>
              <button
                className="btn btn-sm btn-danger mr-2"
                onClick={() => deleteBookingHandler(booking._id)}
                disabled={deleteLoading ? true : false}
              >
                <i className="fas fa-trash w-15"></i>
              </button>
            </div>
          ),
        }),
      )
    return data
  }

  const deleteBookingHandler = (bookingID) => {
    dispatch(adminDeleteBooking(bookingID))
  }

  return (
    <div className="container container-fluid">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="my-5">
            {bookings && bookings.length} Bookings on List
          </h1>

          <MDBDataTable
            data={setAllBookings()}
            className="px-3"
            bordered
            striped
            hover
          />
        </>
      )}
    </div>
  )
}

export default AllBookings

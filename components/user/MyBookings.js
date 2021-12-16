import React, { useEffect } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import { MDBDataTable } from 'mdbreact'
import { toast } from 'react-toastify'
import { CLEAR_ERRORS } from '../../redux/constants/bookingConstants'

const MyBookings = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { bookings, error } = useSelector((state) => state.bookingsGet)

  useEffect(() => {
    // dispatch(getBookings()) //*改由在getServerSideProps發動
    if (error) {
      toast.error(error)
      dispatch({ type: CLEAR_ERRORS })
    }
  }, [dispatch])

  const setBookings = () => {
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
          //*react日期須轉成字串否則會報錯
          checkIn: new Date(booking.checkInDate).toString().slice(0, 15),
          checkOut: new Date(booking.checkOutDate).toString().slice(0, 15),
          amount: '$' + booking.amountPaid,
          actions: (
            <>
              <Link href={`/bookings/${booking._id}`}>
                <a className="btn btn-sm btn-primary">
                  <i class="fas fa-eye"></i>
                </a>
              </Link>
              <button className="btn btn-sm btn-success mx-2">
                <i class="fas fa-file-download"></i>
              </button>
            </>
          ),
        }),
      )
    return data
  }
  return (
    <div className="container container-fluid">
      <h1 className="my-5">My Bookings</h1>

      <MDBDataTable
        data={setBookings()}
        className="px-3"
        bordered
        striped
        hover
      />
    </div>
  )
}

export default MyBookings

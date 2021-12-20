import React, { useEffect } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import easyinvoice from 'easyinvoice'
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
                  <i className="fas fa-eye"></i>
                </a>
              </Link>
              <button
                className="btn btn-sm btn-success mx-2"
                onClick={() => downloadInvoice(booking)}
              >
                <i className="fas fa-file-download w-15"></i>
              </button>
            </>
          ),
        }),
      )
    return data
  }

  const downloadInvoice = async (booking) => {
    const data = {
      documentTitle: 'Bookit INVOICE',
      currency: 'USD',
      taxNotation: 'Tax', //or gst
      marginTop: 25,
      marginRight: 25,
      marginLeft: 25,
      marginBottom: 25,
      logo:
        'https://res.cloudinary.com/bookit/image/upload/v1617904918/bookit/bookit_logo_cbgjzv.png', //必須是url
      sender: {
        company: 'Bookit Corp',
        address: '13547 West Maple Ave',
        zip: '100231',
        city: 'Boston',
        country: 'US',
      },
      client: {
        company: `${booking.user.name}`,
        address: `${booking.user.email}`,
        zip: '',
        city: `Check In: ${new Date(booking.checkInDate).toLocaleDateString()}`,
        country: `Check Out: ${new Date(
          booking.checkOutDate,
        ).toLocaleDateString()}`,
      },
      invoiceNumber: `${booking._id}`,
      invoiceDate: `${new Date(booking.paidAt).toLocaleString('en-US')}`,
      products: [
        {
          quantity: `${booking.daysOfStay}`,
          description: `${booking.room.name}`,
          tax: `${(booking.amountPaid * 0.01).toFixed(0)}`,
          price: `${booking.room.pricePerNight}`,
        },
      ],
      bottomNotice: 'This is auto generated Invoice of your booking on Bookit.',
    }

    //建立發票
    const result = await easyinvoice.createInvoice(data)
    //下載功能
    easyinvoice.download(`invoice_${booking._id}.pdf`, result.pdf)
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

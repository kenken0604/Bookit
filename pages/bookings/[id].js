import React from 'react'
import { wrapper } from '../../redux/store'
import { getSession } from 'next-auth/client'

import Layout from '../../components/layout/Layout'

import { bookingDetails } from '../../redux/actions/bookingActions'
import BookingDetails from '../../components/user/BookingDetails'

const myBookings = () => {
  return (
    <Layout title="My Bookings">
      <BookingDetails />
    </Layout>
  )
}

export default myBookings

//保護此頁
export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async (context) => {
    const { req, params } = context //context代表url裡的內容
    const session = await getSession({ req })

    //沒有得到認證就重新導向
    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }

    //*受到保護的靜態資料需要傳入cookie到action驗證
    await store.dispatch(bookingDetails(req.headers.cookie, req, params.id))
  }
})

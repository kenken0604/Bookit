import React from 'react'
import { wrapper } from '../../redux/store'
import { getSession } from 'next-auth/client'

import Layout from '../../components/layout/Layout'
import MyBookings from '../../components/user/MyBookings'
import { getBookings } from '../../redux/actions/bookingActions'

const myBookings = () => {
  return (
    <Layout title="My Bookings">
      <MyBookings />
    </Layout>
  )
}

export default myBookings

//保護此頁
export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async (context) => {
    const { req } = context //context代表url裡的內容
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
    await store.dispatch(getBookings(req.headers.cookie, req))
  }
})

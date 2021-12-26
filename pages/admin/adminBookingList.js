import { getSession } from 'next-auth/client'
import Layout from '../../components/layout/Layout'
import AllBookings from '../../components/admin/AllBookings'

const adminBookingList = () => {
  return (
    <Layout title="Booking List">
      <AllBookings />
    </Layout>
  )
}

//保護此頁
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  // console.log(session)

  //沒有得到認證就重新導向
  if (!session || session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}

export default adminBookingList
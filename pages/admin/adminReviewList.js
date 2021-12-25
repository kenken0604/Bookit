import { getSession } from 'next-auth/client'
import Layout from '../../components/layout/Layout'
import RoomReviews from '../../components/admin/RoomReviews'

const adminReviewList = () => {
  return (
    <Layout title="Reviews List">
      <RoomReviews />
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

export default adminReviewList

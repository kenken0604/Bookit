import { getSession } from 'next-auth/client'
import Layout from '../../components/layout/Layout'
import AllRooms from '../../components/admin/AllRooms'

const adminRoomList = () => {
  return (
    <Layout title="Room List">
      <AllRooms />
    </Layout>
  )
}

//保護此頁
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  console.log(session)

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

export default adminRoomList

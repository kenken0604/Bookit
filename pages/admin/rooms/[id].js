import React from 'react'
import { getSession } from 'next-auth/client'
import Layout from '../../../components/layout/Layout'
import UpdateRoom from '../../../components/admin/UpdateRoom'

const updateRoom = () => {
  return (
    <Layout title="Update Room">
      <UpdateRoom />
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

export default updateRoom

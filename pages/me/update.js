import React from 'react'
import { getSession } from 'next-auth/client'
import Layout from '../../components/layout/Layout'
import Profile from '../../components/user/Profile'

const updateProfilePage = () => {
  return (
    <Layout title="Update Info">
      <Profile />
    </Layout>
  )
}

//保護此頁
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  //沒有得到認證就重新導向
  if (!session) {
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

export default updateProfilePage

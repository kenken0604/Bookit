import Login from '../components/auth/Login'
import Layout from '../components/layout/Layout'

import { getSession } from 'next-auth/client'

export default function LoginPage() {
  return (
    <Layout title="Login">
      <Login />
    </Layout>
  )
}

//login後避免進入此頁
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  //已經有認證就重新導向到首頁
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

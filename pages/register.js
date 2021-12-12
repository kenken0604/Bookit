import Register from '../components/auth/Register'
import Layout from '../components/layout/Layout'

import { getSession } from 'next-auth/client'

export default function LoginPage() {
  return (
    <Layout title="Register">
      <Register />
    </Layout>
  )
}

//register後避免進入此頁
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

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

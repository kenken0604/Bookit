import HomePage from '../components/HomePage'
import Layout from '../components/layout/Layout'

import { wrapper } from '../redux/store'

import { listRooms } from '../redux/actions/roomActions'

export default function Index() {
  return (
    <Layout>
      <HomePage />
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async (context) => {
    const { req } = context //context代表url裡的內容

    await store.dispatch(listRooms(req))
  }
})

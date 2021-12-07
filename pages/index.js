import Home from '../components/Home'
import Layout from '../components/layout/Layout'

import { wrapper } from '../redux/store'

import { listRooms } from '../redux/actions/roomActions'

export default function Index() {
  return (
    <Layout>
      <Home />
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async (context) => {
    const { req, query } = context //context代表url裡的內容

    await store.dispatch(listRooms(req, query.pageNumber)) //*query是action傳過來的query，不是頁面使用的
  }
})

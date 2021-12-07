import RoomDetails from '../../components/room/RoomDetails'
import Layout from '../../components/layout/Layout'

import { wrapper } from '../../redux/store'

import { getRoomDetails } from '../../redux/actions/roomActions'

export default function RoomDetailsPage() {
  return (
    <Layout title="Room Details">
      <RoomDetails />
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async (context) => {
    const { req, params } = context //context代表url裡的內容

    await store.dispatch(getRoomDetails(req, params.id))
  }
})

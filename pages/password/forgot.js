import React from 'react'
import Layout from '../../components/layout/Layout'
import RequestPassword from '../../components/user/RequetPassword'

const forgot = () => {
  return (
    <Layout title="Password Recovery">
      <RequestPassword />
    </Layout>
  )
}

export default forgot

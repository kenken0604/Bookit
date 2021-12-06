import React from 'react'
import Head from 'next/head'

import Header from './Header'
import Footer from './Footer'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Layout = ({ children, title = 'Bookit | Always Book the Best' }) => {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Welcome to Bookit and book the best option in nice price."
        />
        <meta
          name="keywords"
          content="hotel, villa, resort, hostel, holidays, vacation"
        />

        <title>{title}</title>
      </Head>
      <Header />
      {children}
      <ToastContainer position="bottom-right" />
      <Footer />
    </div>
  )
}

export default Layout

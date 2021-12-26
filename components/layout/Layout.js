import React, { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Header from './Header'
import Footer from './Footer'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Layout = ({ children, title = 'Always Book the Best' }) => {
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      window.scroll({
        top: 0,
        left: 0,
      })
    })
  }, [])

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

        <title>{`Bookit | ${title}`}</title>
      </Head>
      <Header />
      {children}
      <ToastContainer position="bottom-right" />
      <Footer />
    </div>
  )
}

export default Layout

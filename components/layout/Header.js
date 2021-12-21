import React, { useEffect } from 'react'
import Link from 'next/link'
import { NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../../redux/actions/userActions'
import { signOut } from 'next-auth/client'

const Header = () => {
  const dispatch = useDispatch()
  const { loading, user } = useSelector((state) => state.userProfile)

  useEffect(() => {
    if (!user) {
      dispatch(getUserProfile())
    }
  }, [dispatch, user])

  return (
    <nav className="navbar row justify-content-center sticky-top">
      <div className="container">
        <div className="col-3 p-0">
          <Link href="/">
            <div className="navbar-brand">
              <img
                style={{ cursor: 'pointer' }}
                src="/images/bookit_logo.png"
                alt="Bookit"
              />
            </div>
          </Link>
        </div>

        {user && user.name ? (
          <div className="d-flex justify-content-center">
            <figure className="avatar avatar-nav">
              <img
                src={user.avatar.url}
                alt={user.name}
                className="rounded-circle"
              />
            </figure>
            <NavDropdown title={user.name} id="username">
              <NavDropdown.Item href="/bookings/me">
                My Bookings
              </NavDropdown.Item>

              <NavDropdown.Item href="/me/update">Profile</NavDropdown.Item>

              <NavDropdown.Divider></NavDropdown.Divider>

              {user && user.role === 'admin' && (
                <>
                  <NavDropdown.Item href="/admin/adminRoomList">
                    Room List
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin/adminUserList">
                    User List
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin/adminBookingList">
                    Booking List
                  </NavDropdown.Item>
                  <NavDropdown.Divider></NavDropdown.Divider>
                </>
              )}

              <NavDropdown.Item
                onClick={() => signOut()}
                className="text-danger"
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        ) : (
          !loading && (
            <Link href="/login">
              <a className="btn btn-danger px-4 text-white login-header-btn float-right">
                Login
              </a>
            </Link>
          )
        )}
      </div>
    </nav>
  )
}

export default Header

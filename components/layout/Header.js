import React, { useEffect } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../../redux/actions/userActions'
import ButtonLoader from '../ButtonLoader'
import { signOut } from 'next-auth/client'

const Header = () => {
  const dispatch = useDispatch()
  const { loading, user } = useSelector((state) => state.userProfile)

  console.log(loading)
  console.log(user)

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
          <div className="dropdown">
            <a
              className="btn dropdown-toggle"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              <figure className="avatar avatar-nav">
                <img
                  src={user.avatar.url}
                  alt={user.name}
                  className="rounded-circle"
                />
              </figure>
              <span>{user && user.name}</span>
            </a>

            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <Link href="/bookings/me">
                <a className="dropdown-item">My Bookings</a>
              </Link>
              <Link href="/me/update">
                <a className="dropdown-item">Profile</a>
              </Link>
              <div class="dropdown-divider"></div>
              <Link href="/">
                <a
                  className="dropdown-item text-danger"
                  onClick={() => signOut()}
                >
                  Logout
                </a>
              </Link>
            </div>
          </div>
        ) : (
          <Link href="/login">
            <a className="btn btn-danger px-4 text-white login-header-btn float-right">
              Login
            </a>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Header

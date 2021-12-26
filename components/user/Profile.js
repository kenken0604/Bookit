import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/client'

import { toast } from 'react-toastify'
import ButtonLoader from '../ButtonLoader'
import { updateProfile, getUserProfile } from '../../redux/actions/userActions'
import { CLEAR_ERRORS } from '../../redux/constants/userConstants'

const Profile = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState('')

  const router = useRouter()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.userProfile)
  const { loading, success, error } = useSelector((state) => state.userUpdate)

  useEffect(() => {
    if (user && user.name) {
      setName(user.name)
      setEmail(user.email)
      setAvatar(user.avatar.url)
    } else {
      dispatch(getUserProfile())
    }
  }, [dispatch, user])

  const uploadHandler = (e) => {
    let reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result)
      }
    }
    let fileURL = e.target.files[0]
    reader.readAsDataURL(fileURL)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateProfile({ name, email, password, avatar }))
  }

  useEffect(() => {
    if (success) {
      signOut()
      router.push('/login')
    }

    if (error) {
      toast.error(error)
      dispatch({ type: CLEAR_ERRORS })
    }
  }, [dispatch, success, error])

  return (
    <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-11 col-sm-10 col-md-7 col-xl-5">
          <form className="shadow" onSubmit={submitHandler}>
            <h1 className="mb-3">Update Profile</h1>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img src={avatar} className="rounded-circle" alt="image" />
                  </figure>
                </div>

                <div className="custom-file">
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                  <input
                    type="file"
                    className="custom-file-input"
                    id="customFile"
                    accept="images/*"
                    onChange={uploadHandler}
                  />
                </div>
              </div>
            </div>
            <button className="btn btn-block py-2">
              {loading ? <ButtonLoader /> : 'UPDATE'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile

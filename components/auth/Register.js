import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import { toast } from 'react-toastify'
import ButtonLoader from '../ButtonLoader'
import { registerUser, clearErrors } from '../../redux/actions/userActions'

const Register = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState('/images/default_avatar.jpg')

  const { loading, success, error } = useSelector((state) => state.userRegister)

  useEffect(() => {
    if (success) {
      router.push('/login')
    }

    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }
  }, [dispatch, success, error])

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
    dispatch(registerUser({ name, email, password, avatar }))
  }

  return (
    <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow" onSubmit={submitHandler}>
            <h1 className="mb-3">Join Us</h1>
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
              {loading ? <ButtonLoader /> : 'REGISTER'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register

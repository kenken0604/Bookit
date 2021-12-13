import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import { toast } from 'react-toastify'
import ButtonLoader from '../ButtonLoader'
import { setNewPassword } from '../../redux/actions/userActions'
import { CLEAR_ERRORS } from '../../redux/constants/userConstants'

const ResetPassword = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { loading, success, message, error } = useSelector(
    (state) => state.userPasswordReset,
  )

  useEffect(() => {
    if (success) {
      toast.success(message)

      setTimeout(() => {
        router.push('/login')
      }, 1000)
    }

    if (error) {
      toast.error(error)
      dispatch({ type: CLEAR_ERRORS })
    }
  }, [dispatch, success, error])

  const submitHandler = (e) => {
    e.preventDefault()

    const token = router.query.token
    const passwords = { password, confirmPassword }
    dispatch(setNewPassword(token, passwords))
  }
  return (
    <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow" onSubmit={submitHandler}>
            <h1 className="mb-3">Reset Password</h1>

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
              <label htmlFor="email">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button className="btn btn-block py-2">
              {loading ? <ButtonLoader /> : 'RESET PASSWORD'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword

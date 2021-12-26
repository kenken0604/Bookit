import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'

import ButtonLoader from '../ButtonLoader'
import { toast } from 'react-toastify'
import { requestPassword } from '../../redux/actions/userActions'
import { CLEAR_ERRORS } from '../../redux/constants/userConstants'

const RequestPassword = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')

  const { loading, success, message, error } = useSelector(
    (state) => state.userPassword,
  )

  useEffect(() => {
    if (success) {
      toast.success(message)
    }
    if (error) {
      toast.error(error)
      dispatch({ type: CLEAR_ERRORS })
    }
  }, [dispatch, message, error])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(requestPassword(email))
  }
  return (
    <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-11 col-sm-10 col-md-6 col-xl-5">
          <form className="shadow" onSubmit={submitHandler}>
            <h1 className="mb-3">Request Password</h1>

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

            <button
              className="btn btn-block py-2"
              disabled={loading ? true : false}
            >
              {loading ? <ButtonLoader /> : 'SEND EMAIL'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RequestPassword

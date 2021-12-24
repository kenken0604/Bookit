import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { toast } from 'react-toastify'
import ButtonLoader from '../ButtonLoader'
import Loader from '../layout/Loader'

import {
  adminUserDetails,
  updateUserStatus,
} from '../../redux/actions/userActions'
import {
  ADMIN_UPDATE_USER_RESET,
  CLEAR_ERRORS,
} from '../../redux/constants/userConstants'

const UpdateUser = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [role, setRole] = useState('user')

  const { loading, user, error } = useSelector((state) => state.userDetails)
  const { updateLoading, updateSuccess, updateError } = useSelector(
    (state) => state.userStatusUpdate,
  )

  const { id } = router.query

  useEffect(() => {
    if (!user || user._id !== id) {
      dispatch(adminUserDetails(id))
    } else {
      setRole(user.role)
    }

    if (error) {
      toast.error(error)
      dispatch({ type: CLEAR_ERRORS })
    }

    if (updateError) {
      toast.error(updateError)
      dispatch({ type: CLEAR_ERRORS })
    }

    if (updateSuccess) {
      toast.success('Status update successfully')
      router.push('/admin/adminUserList')
      dispatch({ type: ADMIN_UPDATE_USER_RESET })
    }
  }, [dispatch, user, id, error, updateError, updateSuccess])

  const userData = { role }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUserStatus(id, userData))
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container container-fluid">
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <Link href="/admin/adminUserList">
                <button className="btn btn-danger mb-5">Go Back</button>
              </Link>
              <form className="shadow" onSubmit={submitHandler}>
                <h1 className="mb-3">Update Status</h1>

                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={user.name}
                    disabled
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={user.email}
                    disabled
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <select
                    id="role"
                    className="form-control"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    {['user', 'admin'].map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  className="btn btn-block py-2"
                  disabled={updateLoading ? true : false}
                >
                  {updateLoading ? <ButtonLoader /> : 'UPDATE'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UpdateUser

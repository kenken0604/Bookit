import React, { useEffect } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import Loader from '../layout/Loader'
import { MDBDataTable } from 'mdbreact'
import { toast } from 'react-toastify'
import {
  CLEAR_ERRORS,
  USER_DELETE_RESET,
} from '../../redux/constants/userConstants'
import {
  adminDeleteUser,
  getAdminUserlist,
} from '../../redux/actions/userActions'

const AllUsers = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { loading, users, error } = useSelector((state) => state.adminUserslist)
  const { deleteLoading, deleteSuccess, deleteError } = useSelector(
    (state) => state.userDelete,
  )

  useEffect(() => {
    dispatch(getAdminUserlist())

    if (error) {
      toast.error(error)
      dispatch({ type: CLEAR_ERRORS })
    }

    if (deleteSuccess) {
      router.push('/admin/adminUserList')
      dispatch({ type: USER_DELETE_RESET })
    }

    if (deleteError) {
      toast.error(deleteError)
      dispatch({ type: CLEAR_ERRORS })
    }
  }, [dispatch, deleteSuccess, deleteError])

  const setAllUsers = () => {
    const data = {
      columns: [
        {
          label: 'User ID',
          field: 'id',
          sort: 'asc', //升序排列
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Email',
          field: 'email',
          sort: 'asc',
        },
        {
          label: 'Role',
          field: 'role',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
          sort: 'asc',
        },
      ],
      rows: [],
    }
    users &&
      users.forEach((user) =>
        data.rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          actions: (
            <>
              <Link href={`/admin/users/${user._id}`}>
                <a className="btn btn-sm btn-primary">
                  <i className="fas fa-edit"></i>
                </a>
              </Link>
              <button
                className="btn btn-sm btn-danger mx-2"
                onClick={() => deleteUserHandler(user._id)}
                disabled={deleteLoading ? true : false}
              >
                <i className="fas fa-trash w-15"></i>
              </button>
            </>
          ),
        }),
      )
    return data
  }

  const deleteUserHandler = (userID) => {
    dispatch(adminDeleteUser(userID))
  }

  return (
    <div className="container container-fluid">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="my-5">{users && users.length} Users on List</h1>

          <MDBDataTable
            data={setAllUsers()}
            className="px-3"
            bordered
            striped
            hover
          />
        </>
      )}
    </div>
  )
}

export default AllUsers

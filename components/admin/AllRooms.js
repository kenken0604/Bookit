import React, { useEffect } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import Loader from '../layout/Loader'
import { MDBDataTable } from 'mdbreact'
import { toast } from 'react-toastify'
import { CLEAR_ERRORS } from '../../redux/constants/roomConstants'
import {
  getAdminRoomlist,
  adminDeleteRoom,
} from '../../redux/actions/roomActions'
import { ROOM_DELETE_RESET } from '../../redux/constants/roomConstants'

const AllRooms = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { loading, rooms, error } = useSelector((state) => state.adminRoomlist)
  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.roomDelete,
  )

  useEffect(() => {
    dispatch(getAdminRoomlist())

    if (error) {
      toast.error(error)
      dispatch({ type: CLEAR_ERRORS })
    }

    if (isDeleted) {
      router.push('/admin/adminRoomList')
      dispatch({ type: ROOM_DELETE_RESET })
    }

    if (deleteError) {
      toast.error(deleteError)
      dispatch({ type: CLEAR_ERRORS })
    }
  }, [dispatch, isDeleted, deleteError])

  const setAllRooms = () => {
    const data = {
      columns: [
        {
          label: 'Room ID',
          field: 'id',
          sort: 'asc', //升序排列
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Price / Night',
          field: 'price',
          sort: 'asc',
        },
        {
          label: 'Category',
          field: 'category',
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
    rooms &&
      rooms.map((room) =>
        data.rows.push({
          id: room._id,
          name: room.name,
          price: '$' + room.pricePerNight,
          category: room.category,
          actions: (
            <>
              <Link href={`/room/${room._id}`}>
                <a className="btn btn-sm btn-primary">
                  <i className="fas fa-edit"></i>
                </a>
              </Link>
              <button
                className="btn btn-sm btn-danger mx-2"
                onClick={() => deleteRoomHandler(room._id)}
              >
                <i className="fas fa-trash w-15"></i>
              </button>
            </>
          ),
        }),
      )
    return data
  }

  const deleteRoomHandler = (roomID) => {
    dispatch(adminDeleteRoom(roomID))
  }

  return (
    <div className="container container-fluid">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="my-5">
            {rooms && rooms.length} Rooms on list
            <Link href="/admin/rooms/createNewRoom">
              <a className="mt-0 btn text-white float-right new-room-btn">
                Create Room
              </a>
            </Link>
          </h1>

          <MDBDataTable
            data={setAllRooms()}
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

export default AllRooms

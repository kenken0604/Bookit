import React, { useEffect } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import Loader from '../layout/Loader'
import { MDBDataTable } from 'mdbreact'
import { toast } from 'react-toastify'
import { CLEAR_ERRORS } from '../../redux/constants/roomConstants'
import { getAdminRoomlist } from '../../redux/actions/roomActions'

const AllRooms = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { loading, rooms, error } = useSelector((state) => state.adminRoomlist)

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch({ type: CLEAR_ERRORS })
    }
    dispatch(getAdminRoomlist())
  }, [dispatch])

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
              <button className="btn btn-sm btn-danger mx-2">
                <i className="fas fa-trash w-15"></i>
              </button>
            </>
          ),
        }),
      )
    return data
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

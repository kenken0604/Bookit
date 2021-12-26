import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import Loader from '../layout/Loader'
import { toast } from 'react-toastify'
import { MDBDataTable } from 'mdbreact'
import { roomReviews, deleteReviews } from '../../redux/actions/roomActions'
import {
  ROOM_REVIEW_DELETE_RESET,
  CLEAR_ERRORS,
} from '../../redux/constants/roomConstants'

const RoomReviews = () => {
  const [roomID, setRoomID] = useState('')

  const dispatch = useDispatch()
  const router = useRouter()
  const { loading, reviews, error } = useSelector((state) => state.roomReviews)
  const { deleteLoading, deleteSuccess, deleteError } = useSelector(
    (state) => state.roomReviewDelete,
  )

  useEffect(() => {
    if (roomID !== '') {
      dispatch(roomReviews(roomID))

      if (error) {
        toast.error('Cannot find any review by the room ID')
        dispatch({ type: CLEAR_ERRORS })
        setRoomID('')
      }
    }

    if (deleteSuccess) {
      router.push('/admin/adminReviewList')
      dispatch({ type: ROOM_REVIEW_DELETE_RESET })
    }

    if (deleteError) {
      toast.error(deleteError)
      dispatch({ type: CLEAR_ERRORS })
    }
  }, [dispatch, error, roomID, deleteSuccess, deleteError])

  const setReviews = () => {
    const data = {
      columns: [
        {
          label: 'Review ID',
          field: 'id',
          sort: 'asc', //升序排列
        },
        {
          label: 'Rating',
          field: 'rating',
          sort: 'asc',
        },
        {
          label: 'Comment',
          field: 'comment',
          sort: 'asc',
        },
        {
          label: 'User',
          field: 'user',
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
    reviews &&
      reviews.forEach((review) =>
        data.rows.push({
          id: review._id,
          rating: review.rating,
          comment: review.comment,
          user: review.name,
          actions: (
            <>
              <button
                className="btn btn-sm btn-danger mr-2"
                onClick={() => deleteReviewHandler(roomID, review._id)}
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

  const deleteReviewHandler = (roomID, reviewID) => {
    dispatch(deleteReviews(roomID, reviewID))
  }

  return (
    <div className="container container-fluid">
      <div className="row justify-content-center mt-5">
        <div className="col-8 col-md-5">
          <form>
            <div className="form-group">
              <label htmlFor="roomId_field">Enter Room ID</label>
              <input
                type="email"
                id="roomId_field"
                className="form-control"
                value={roomID}
                onChange={(e) => setRoomID(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="alert alert-danger my-5">
          Room not found with the ID, try different one.
        </div>
      ) : reviews && reviews.length > 0 ? (
        <>
          <h3 className="my-2 text-center">
            {reviews && reviews.length} Reviews about the room
          </h3>

          <MDBDataTable
            data={setReviews()}
            className="px-3"
            bordered
            striped
            hover
          />
        </>
      ) : (
        <>
          <h3 className="my-2 text-center">0 Reviews about the room</h3>
          <div className="alert alert-warning my-5">
            No Review about the room yet
          </div>
        </>
      )}
    </div>
  )
}

export default RoomReviews

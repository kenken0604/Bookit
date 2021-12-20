import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import {
  createReview,
  checkReviewAvailable,
} from '../../redux/actions/roomActions'

import {
  REVIEW_CREATE_RESET,
  CLEAR_ERRORS,
} from '../../redux/constants/roomConstants'

const NewReview = () => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()
  const router = useRouter()

  const { success, error } = useSelector((state) => state.reviewCreate)
  const { isReviewAvailable } = useSelector((state) => state.reviewAvailable)

  const { id } = router.query

  useEffect(() => {
    dispatch(checkReviewAvailable(id))

    if (error) {
      toast.error(error)
      dispatch({ type: CLEAR_ERRORS })
    }

    if (success) {
      toast.success('Review has been sent.')
      dispatch({ type: REVIEW_CREATE_RESET })
      setRating(0)
      setComment('')

      //重新導向畫面渲染
      router.push(`/room/${id}`)
    }
  }, [dispatch, success, error, id])

  const submitHandler = () => {
    const reviewData = {
      rating,
      comment,
      roomID: id,
    }

    dispatch(createReview(reviewData))
  }

  function setUserRatings() {
    const stars = document.querySelectorAll('.star')

    stars.forEach((star, index) => {
      star.starValue = index + 1
      ;['click', 'mouseover', 'mouseout'].forEach(function (e) {
        star.addEventListener(e, showRatings)
      })
    })

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === 'click') {
          if (index < this.starValue) {
            star.classList.add('orange')

            setRating(this.starValue)
          } else {
            star.classList.remove('orange')
          }
        }

        if (e.type === 'mouseover') {
          if (index < this.starValue) {
            star.classList.add('yellow')
          } else {
            star.classList.remove('yellow')
          }
        }

        if (e.type === 'mouseout') {
          star.classList.remove('yellow')
        }
      })
    }
  }

  return (
    <div>
      {isReviewAvailable && (
        <>
          <h3>Submit Review</h3>

          <div>
            <ul className="stars" onClick={setUserRatings}>
              <li className="star">
                <i className="fa fa-star"></i>
              </li>
              <li className="star">
                <i className="fa fa-star"></i>
              </li>
              <li className="star">
                <i className="fa fa-star"></i>
              </li>
              <li className="star">
                <i className="fa fa-star"></i>
              </li>
              <li className="star">
                <i className="fa fa-star"></i>
              </li>
            </ul>

            <textarea
              className="form-control mt-3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>

            <button
              className="btn my-3 float-right review-btn px-4 text-white"
              onClick={submitHandler}
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default NewReview

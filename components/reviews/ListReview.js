import React from 'react'
import Rating from '../room/Rating'

const ListReview = ({ reviews }) => {
  return (
    <div className="reviews mt-4">
      <h3>Latest Reviews</h3>
      <hr />

      {reviews && reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="review-card my-3">
            <Rating value={review.rating} />
            <p className="review_user">by {review.name}</p>
            <p className="review_comment">{review.comment}</p>

            <hr />
          </div>
        ))
      ) : (
        <div className="alert alert-warning">No Comment yet</div>
      )}
    </div>
  )
}

export default ListReview

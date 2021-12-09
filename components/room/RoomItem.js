import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Rating from './Rating'

const RoomItem = ({ room }) => {
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card p-2">
        <Image
          src={room.images[0].url}
          alt={room.name}
          className="card-img-top mx-auto object-fit"
          height={170}
          width={200}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link href={`/room/${room._id}`}>{room.name}</Link>
          </h5>
          <div className="rating mt-auto mb-3">
            <p className="card-text">
              <b>${room.pricePerNight}</b>
              <small> /night</small>
            </p>
            <span className="float-right">
              <Rating value={room.rating} />
              {room.numOfReviews} Reviews
            </span>
          </div>
          <Link href={`/room/${room._id}`}>
            <button className="btn btn-block view-btn text-white">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RoomItem

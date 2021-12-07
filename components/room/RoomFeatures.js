import React from 'react'

const RoomFeatures = ({ room }) => {
  return (
    <div className="features mt-5">
      <h3 className="mb-4">Features</h3>
      <div className="room-feature">
        <i className="fas fa-users mr-2"></i>{' '}
        <p>
          {room.guestCapacity} {room.guestCapacity > 1 ? 'Guests' : 'Guest'}
        </p>
      </div>
      <div className="room-feature">
        <i className="fas fa-bed mr-2"></i>{' '}
        <p>
          {room.numOfBeds} {room.numOfBeds > 1 ? 'Beds' : 'Bed'}
        </p>
      </div>
      <div className="room-feature">
        <i className="fas fa-wifi mr-2"></i>{' '}
        {room.internet ? <p>Free Wi-fi</p> : <p>No Wi-fi</p>}
      </div>
      <div className="room-feature">
        <i className="fas fa-coffee mr-2"></i>{' '}
        {room.internet ? <p>Free Breakfast</p> : <p>No Breakfast</p>}
      </div>
      <div className="room-feature">
        <i class="fas fa-wind mr-2"></i>{' '}
        {room.airConditioned ? (
          <p>Air Conditioning</p>
        ) : (
          <p>No Air Conditioning</p>
        )}
      </div>
      <div className="room-feature">
        <i className="fas fa-dog mr-2"></i>{' '}
        {room.petsAllowed ? <p>Pets Allowed</p> : <p>Pets Not Allowed</p>}
      </div>
      <div className="room-feature">
        <i
          className={
            room.roomCleaning
              ? 'fas fa-check mr-2 text-success'
              : 'fas fa-times mr-2 text-danger'
          }
        ></i>{' '}
        {room.roomCleaning ? <p>Room Service</p> : <p>No Room Service</p>}
      </div>
    </div>
  )
}

export default RoomFeatures

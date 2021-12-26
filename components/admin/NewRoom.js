import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import ButtonLoader from '../ButtonLoader'
import { toast } from 'react-toastify'

import { createNewRoom } from '../../redux/actions/roomActions'
import {
  CLEAR_ERRORS,
  ROOM_CREATE_RESET,
} from '../../redux/constants/roomConstants'

const NewRoom = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [address, setAddress] = useState('')
  const [category, setCategory] = useState('King')
  const [guestCapacity, setGuestCapacity] = useState(1)
  const [numOfBeds, setNumOfBeds] = useState(1)
  const [internet, setInternet] = useState(false)
  const [breakfast, setBreakfast] = useState(false)
  const [airConditioned, setAirConditioned] = useState(false)
  const [petsAllowed, setPetsAllowed] = useState(false)
  const [roomCleaning, setRoomCleaning] = useState(false)

  const [images, setImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])

  const dispatch = useDispatch()
  const router = useRouter()

  const { loading, success, error } = useSelector((state) => state.roomCreate)

  useEffect(() => {
    if (success) {
      router.push('/admin/adminRoomList')
      dispatch({ type: ROOM_CREATE_RESET })
    }
    if (error) {
      toast.error(error)
      dispatch({ type: CLEAR_ERRORS })
    }
  }, [dispatch, error, success])

  const submitHandler = (e) => {
    e.preventDefault()
    const roomData = {
      name,
      pricePerNight: price,
      description,
      address,
      guestCapacity: Number(guestCapacity),
      numOfBeds: Number(numOfBeds),
      internet,
      breakfast,
      airConditioned,
      petsAllowed,
      roomCleaning,
      category,
      images,
    }
    if (images.length === 0) return toast.error('Please upload images.')

    dispatch(createNewRoom(roomData))
  }

  const uploadHandler = (e) => {
    console.log(e.target.files)
    const files = Array.from(e.target.files)

    //*讓使用者重新上傳，必須重設狀態
    setImages([])
    setImagesPreview([])

    files.forEach((file) => {
      let reader = new FileReader()

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((array) => [...array, reader.result]) //*
          setImagesPreview((array) => [...array, reader.result]) //*
        }
      }

      reader.readAsDataURL(file)
    })
  }

  return (
    <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-11 col-sm-10 col-md-8 col-xl-6">
          <button className="btn btn-danger" onClick={() => router.back()}>
            Go Back
          </button>
          <form
            className="shadow mt-5"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <h1 className="mb-4">New Room</h1>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                id="price"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                rows="8"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {['King', 'Single', 'Twins'].map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="guest">Guest Capacity</label>
              <select
                id="guest"
                className="form-control"
                value={guestCapacity}
                onChange={(e) => setGuestCapacity(e.target.value)}
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option value={num} key={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="bed">Number of Beds</label>
              <select
                id="bed"
                className="form-control"
                value={numOfBeds}
                onChange={(e) => setNumOfBeds(e.target.value)}
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option value={num} key={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <label className="mb-3">Room Features</label>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="internet"
                value={internet}
                onChange={(e) => setInternet(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="internet">
                Internet
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="breakfast"
                value={breakfast}
                onChange={(e) => setBreakfast(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="breakfast">
                Breakfast
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="airConditioned"
                value={airConditioned}
                onChange={(e) => setAirConditioned(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="airConditioned">
                Air Conditioned
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="petsAllowed"
                value={petsAllowed}
                onChange={(e) => setPetsAllowed(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="petsAllowed">
                Pets Allowed
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="roomCleaning"
                value={roomCleaning}
                onChange={(e) => setRoomCleaning(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="roomCleaning">
                Room Cleaning
              </label>
            </div>

            <div className="form-group mt-4">
              <label>Images</label>
              <div className="custom-file">
                <input
                  type="file"
                  name="room_images"
                  className="custom-file-input"
                  id="customFile"
                  onChange={uploadHandler}
                  multiple
                />
                <label className="custom-file-label" htmlFor="customFile">
                  Choose Images
                </label>
              </div>

              {imagesPreview.map((img) => (
                <img
                  src={img}
                  key={img}
                  alt="Images Preview"
                  className="mt-3 mr-2"
                  width="55"
                  height="52"
                />
              ))}
            </div>

            <button type="submit" className="btn btn-block new-room-btn py-3">
              {loading ? <ButtonLoader /> : 'CREATE'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewRoom

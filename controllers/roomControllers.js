import Room from '../models/roomModel'
import Booking from '../models/bookingModel'

import ErrorHandler from '../utils/errorHandler'
import catchAsyncError from '../middlewares/catchAsyncError'
// import apiFeature from '../utils/apiFeature'
import cloudinary from 'cloudinary'

// @func    get a room
// @route   get /api/rooms
// @access  public
export const getAllRooms = catchAsyncError(async (req, res) => {
  const pageSize = 4
  const pageNumber = Number(req.query.pageNumber) || 1

  const keyword = req.query.location
    ? {
        address: {
          $regex: req.query.location,
          $options: 'i',
        },
      }
    : {}

  const queryCopy = { ...req.query }
  delete queryCopy.location //排除路由上的location做過濾
  delete queryCopy.pageNumber //排除路由上page做過濾

  const roomsCount = await Room.countDocuments({ ...keyword })
  const rooms = await Room.find({ ...keyword, ...queryCopy })
    .limit(pageSize)
    .skip(pageSize * (pageNumber - 1))

  res.status(200).json({
    success: true,
    rooms,
    pageNumber,
    roomsCount,
    pageSize,
  })
})

// @func    get a room by ID
// @route   get /api/rooms/:id
// @access  public
export const getRoomByID = catchAsyncError(async (req, res, next) => {
  const room = await Room.findById(req.query.id) //next沒有params

  if (room) {
    res.status(200).json({
      success: true,
      room,
    })
  } else {
    throw next(new ErrorHandler('Room not found', 404))
  }
})

// @func    create a room
// @route   post /api/rooms
// @access  private
export const createRoom = catchAsyncError(async (req, res) => {
  const images = req.body.images

  const imageLinks = []

  for (let i = 0; images.length > i; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: 'bookit/rooms',
    })

    imageLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    })
  }

  req.body.images = imageLinks
  req.body.user = req.user._id

  const room = await Room.create(req.body) //*

  res.status(200).json({
    success: true,
    room,
  })
})

// @func    update a room by ID
// @route   put /api/rooms/:id
// @access  private
export const updateRoom = catchAsyncError(async (req, res, next) => {
  const room = await Room.findById(req.query.id) //next沒有params

  if (room) {
    if (req.body.images.length !== 0) {
      //刪除原照片
      for (let i = 0; room.images.length > i; i++) {
        await cloudinary.v2.uploader.destroy(room.images[i].public_id)
      }

      //上傳新照片
      const imageLinks = []
      for (let i = 0; req.body.images.length > i; i++) {
        const result = await cloudinary.v2.uploader.upload(req.body.images[i], {
          folder: 'bookit/rooms',
        })

        imageLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        })
      }
      //重新指派
      req.body.images = imageLinks
    } else {
      req.body.images = room.images //* 沒收到照片就指定原照片
    }

    const updatedRoom = await Room.findByIdAndUpdate(req.query.id, req.body, {
      new: true, //讓mongoose返回新物件
      runValidators: true,
      useFindAndModify: false, //避免使用到此棄用的指令
    })

    res.status(200).json({
      success: true,
      updatedRoom,
    })
  } else {
    throw next(new ErrorHandler('Room not found', 404))
  }
})

// @func    delete a room by ID
// @route   delete /api/rooms/:id
// @access  private
export const deleteRoom = catchAsyncError(async (req, res, next) => {
  const room = await Room.findById(req.query.id) //next沒有params

  if (room) {
    //刪除照片
    for (let i = 0; room.images.length > i; i++) {
      await cloudinary.v2.uploader.destroy(room.images[i].public_id) //刪除原照片
    }

    // await Room.remove(room) //這樣寫也可以
    await room.remove()

    res.status(200).json({
      success: true,
      message: 'Room deleted',
    })
  } else {
    throw next(new ErrorHandler('Room not found', 404))
  }
})

// @func    create room review
// @route   put /api/reviews
// @access  private
export const createRoomReview = catchAsyncError(async (req, res) => {
  const { rating, comment, roomID } = req.body

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  }

  const room = await Room.findById(roomID)

  const isReviewed = room.reviews.find(
    (review) => review.user.toString() === req.user._id.toString(),
  )
  //會回傳undefined或整個物件

  if (isReviewed) {
    //有找到就覆蓋留言
    room.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment
        review.rating = rating
      }
    })
  } else {
    //沒找到就增加
    room.reviews.push(review)
  }

  //更改資料庫資料
  room.numOfReviews = room.reviews.length
  room.ratings =
    room.reviews.reduce((acc, item) => item.rating + acc, 0) /
    room.reviews.length

  //更新資料
  await room.save({ validateBeforeSave: false })

  res.status(200).json({
    success: true,
  })
})

// @func    Check Review Availability
// @route   get /api/reviews/check_review_availability
// @access  private
export const checkReviewAvailability = catchAsyncError(async (req, res) => {
  const { roomID } = req.query

  const bookings = await Booking.find({ user: req.user._id, room: roomID }) //多重條件搜尋

  let isReviewAvailable = false
  if (bookings.length > 0) isReviewAvailable = true

  res.status(200).json({
    isReviewAvailable,
  })
})

// @func    admin gets all room
// @route   get /api/admin/rooms
// @access  private
export const roomList = catchAsyncError(async (req, res) => {
  const rooms = await Room.find()

  res.status(200).json({
    success: true,
    rooms,
  })
})

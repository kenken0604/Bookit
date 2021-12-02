import Room from '../models/roomModel'

import ErrorHandler from '../utils/errorHandler'
import catchAsyncError from '../middlewares/catchAsyncError'

// @func    get a room
// @route   get /api/rooms
// @access  public
export const getAllRooms = catchAsyncError(async (req, res) => {
  const rooms = await Room.find({})

  res.status(200).json({
    success: true,
    count: rooms.length, //*
    rooms,
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
    await Room.remove(room)

    res.status(200).json({
      success: true,
      message: 'Room deleted',
    })
  } else {
    throw next(new ErrorHandler('Room not found', 404))
  }
})

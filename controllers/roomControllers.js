import Room from '../models/roomModel'

// @func    get a room
// @route   get /api/rooms
// @access  public
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({})

    res.status(200).json({
      success: true,
      count: rooms.length, //*
      rooms,
    })
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    })
  }
}

// @func    create a room
// @route   post /api/rooms
// @access  private/admin
export const createRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body) //*

    res.status(200).json({
      success: true,
      room,
    })
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    })
  }
}

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

  const roomsCount = await Room.countDocuments({ ...keyword })
  const rooms = await Room.find({ ...keyword })
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

import Booking from '../models/bookingModel'

import ErrorHandler from '../utils/errorHandler'
import catchAsyncError from '../middlewares/catchAsyncError'

// @func    create new booking
// @route   post /api/bookings
// @access  private
export const createBooking = catchAsyncError(async (req, res) => {
  const {
    roomID,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
  } = req.body

  if (checkInDate && checkOutDate) {
    const booking = await Booking.create({
      room: roomID,
      user: req.user._id,
      checkInDate,
      checkOutDate,
      amountPaid,
      daysOfStay,
      paymentInfo,
      paidAt: Date.now(),
    })

    res.status(200).json({
      success: true,
      booking,
    })
  } else {
    res.status(400)
    throw new Error('Please choose a date range.')
  }
})

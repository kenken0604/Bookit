import Booking from '../models/bookingModel'

import ErrorHandler from '../utils/errorHandler'
import catchAsyncError from '../middlewares/catchAsyncError'

import Moment from 'moment'
import { extendMoment } from 'moment-range'

const moment = extendMoment(Moment)

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

// @func    check if available
// @route   get /api/bookings/check
// @access  public
export const checkAvailable = catchAsyncError(async (req, res) => {
  let { roomID, checkInDate, checkOutDate } = req.query

  const booking = await Booking.find({
    room: roomID,
    //*MongoDB進階搜尋方法
    $and: [
      { checkInDate: { $lte: checkOutDate } }, //*
      { checkOutDate: { $gte: checkInDate } }, //*
    ],
  })

  //[]被視為一個物件因此布林值為true
  let isAvailable
  if (booking && booking.length === 0) {
    isAvailable = true
  } else {
    isAvailable = false
  }

  res.status(200).json({
    success: true,
    isAvailable,
  })
})

// @func    show booked room
// @route   get /api/bookings/check_booked_dates
// @access  public
export const checkBookedDates = catchAsyncError(async (req, res) => {
  const { roomID } = req.query

  const bookings = await Booking.find({ room: roomID })

  let bookingDates = []
  const timeGap = moment().utcOffset() / 60 //*utc偏移量是用分鐘計算

  bookings.forEach((booking) => {
    const start = moment(booking.checkInDate).add(timeGap, 'hours')
    const end = moment(booking.checkOutDate).add(timeGap, 'hours')
    const range = moment.range(moment(start), moment(end))

    const dates = Array.from(range.by('day')) //以日排列
    bookingDates = bookingDates.concat(dates)
  })

  res.status(200).json({
    success: true,
    bookingDates,
  })
})

// @func    display personal bookings
// @route   get /api/bookings/me
// @access  private
export const getMyBookings = catchAsyncError(async (req, res) => {
  const mybookings = await Booking.find({ user: req.user._id })
    .populate({
      path: 'room',
      select: 'name pricePerNight images',
    })
    .populate({
      path: 'user',
      select: 'name email',
    })

  if (mybookings) {
    res.status(200).json({
      success: true,
      mybookings,
    })
  } else {
    res.status(404)
    throw new Error('No booking found.')
  }
})

// @func    get booking detail
// @route   get /api/bookings/:id
// @access  private
export const getBookingDetail = catchAsyncError(async (req, res) => {
  const booking = await Booking.findById(req.query.id)
    .populate({
      path: 'room',
      select: 'name pricePerNight images',
    })
    .populate({
      path: 'user',
      select: 'name email',
    })

  if (booking) {
    res.status(200).json({
      success: true,
      booking,
    })
  } else {
    res.status(404)
    throw new Error('booking not found.')
  }
})

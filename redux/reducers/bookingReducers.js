import {
  BOOKING_CREATE_FAIL,
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  CLEAR_ERRORS,
} from '../constants/bookingConstants'

//create booking
export const bookingCreateReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case BOOKING_CREATE_REQUEST:
      return {
        loading: true,
      }
    case BOOKING_CREATE_SUCCESS:
      return {
        loading: false,
        success: payload.success,
        bookingDetail: payload.booking,
      }
    case BOOKING_CREATE_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

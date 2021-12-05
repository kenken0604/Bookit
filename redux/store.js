import { createStore, applyMiddleware } from 'redux'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import thunkMiddleware from 'redux-thunk'
import allReducers from './reducers/allReducers'

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const reducer = (state, action) => {
  const { type, payload } = action
  if (type === HYDRATE) {
    const nextState = {
      ...state,
      ...payload,
    }
    return nextState
  } else {
    return allReducers(state, action)
  }
}

const initStore = () => {
  return createStore(reducer, bindMiddleware([thunkMiddleware]))
}

export const wrapper = createWrapper(initStore)

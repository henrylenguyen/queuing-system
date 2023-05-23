import { combineReducers } from '@reduxjs/toolkit'
import navSlice from './slice/navSlice'

const rootReducer = combineReducers({
  navbar: navSlice
})
export default rootReducer

import { configureStore } from '@reduxjs/toolkit'
import navSlice from './slice/navSlice'
import usersReducer from './slice/userSlice'
import authReducer from './slice/authSlice'

const store = configureStore({
  reducer: {
    navbar: navSlice,
    user: usersReducer,
    auth: authReducer
  }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store

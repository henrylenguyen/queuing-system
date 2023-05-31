import { configureStore } from '@reduxjs/toolkit'
import navSlice from './slice/navSlice'
import usersReducer from './slice/userSlice'
import authReducer from './slice/authSlice'
import devicesReducer from './slice/devices.slice'

const store = configureStore({
  reducer: {
    navbar: navSlice,
    user: usersReducer,
    auth: authReducer,
    device: devicesReducer
  }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store

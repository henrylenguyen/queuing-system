import { configureStore } from '@reduxjs/toolkit'
import navSlice from './slice/navSlice'
import usersReducer from './slice/userSlice'
import authReducer from './slice/authSlice'
import devicesReducer from './slice/devices.slice'
import servicesReducer from './slice/services.slice'
import numberReducer from './slice/numberSlice'
import reportReducer from './slice/reportSlice'
import roleReducer from './slice/role.slice'

const store = configureStore({
  reducer: {
    navbar: navSlice,
    user: usersReducer,
    auth: authReducer,
    device: devicesReducer,
    service: servicesReducer,
    number: numberReducer,
    report: reportReducer,
    role: roleReducer
  }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store

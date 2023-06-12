import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/auth.slice'
import devicesReducer from './slice/devices.slice'
import diaryReducer from './slice/diary.slice'
import navSlice from './slice/nav.slice'
import numberReducer from './slice/number.slice'
import reportReducer from './slice/report.slice'
import roleReducer from './slice/role.slice'
import servicesReducer from './slice/services.slice'
import usersReducer from './slice/userSlice'

const store = configureStore({
  reducer: {
    navbar: navSlice,
    user: usersReducer,
    auth: authReducer,
    device: devicesReducer,
    service: servicesReducer,
    number: numberReducer,
    report: reportReducer,
    role: roleReducer,
    diary: diaryReducer
  }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store

import { PayloadAction } from '@reduxjs/toolkit'
import { IAuth } from 'constants/interface/auth.interface'
import { UserState } from 'redux/slice/userSlice'

export const fetchUsersFulfilled = (state: UserState, action: any) => {
  state.isLoading = false
  state.error = null
  state.users = action.payload
}
export const fetchUserRolesFulfilled = (state: UserState, action: any) => {
  state.isLoading = false
  state.error = null
  state.userRole = action.payload
}
export const AddUserFulfilled = (state: UserState, action: any) => {
  state.isLoading = false
  state.error = null
  state.addUserSuccess = action.payload
}
export const fetchUserDetailFulfilled = (state: UserState, action: any) => {
  state.isLoading = false
  state.error = null
  state.userDetail = action.payload
}
export const UpdateUserFulfilled = (state: UserState, action: any) => {
  state.isLoading = false
  state.error = null
  state.updateUserSuccess = action.payload
}
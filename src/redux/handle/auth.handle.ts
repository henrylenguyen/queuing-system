import { PayloadAction } from '@reduxjs/toolkit'
import { IAuth, IChangePass } from 'constants/interface/auth.interface'

export const loginFulfilled = (state: any, action: PayloadAction<IAuth>) => {
  state.isLoading = false
  state.error = null
  state.user = action.payload
}

export const fetchUserLoginFulfilled = (state: any, action: PayloadAction<IAuth>) => {
  state.isLoading = false
  state.error = null
  state.user = action.payload
}
export const checkEmailExistenceFulfilled = (state: any, action: PayloadAction<boolean>) => {
  state.isLoading = false
  state.error = null
  state.emailValid = action.payload
}
export const changePasswordActionFulfilled = (state: any, action: any) => {
  state.isLoading = false
  state.error = null
  state.isChangedPass = action.payload
}

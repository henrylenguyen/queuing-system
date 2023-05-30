import { PayloadAction } from '@reduxjs/toolkit'
import { IAuth } from 'constants/interface/auth.interface'

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
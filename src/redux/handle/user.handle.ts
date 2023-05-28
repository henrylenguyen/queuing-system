import { PayloadAction } from '@reduxjs/toolkit'
import { IAuth } from 'constants/interface/auth.interface'
import { UserState } from 'redux/slice/userSlice'

export const fetchUsersFulfilled = (state: UserState, action: PayloadAction<IAuth[]>) => {
  state.isLoading = false
  state.error = null
  state.users = action.payload
}

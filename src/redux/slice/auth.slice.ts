import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IAuth } from 'constants/interface/auth.interface'
import { IHanle } from 'constants/interface/handle.interface'
import { changePasswordAction, checkEmailExistence, fetchUserLogin, loginAction } from 'redux/action/users/auth.action'
import { handleError, handlePending } from 'redux/handle'
import {
  changePasswordActionFulfilled,
  checkEmailExistenceFulfilled,
  fetchUserLoginFulfilled,
  loginFulfilled
} from 'redux/handle/auth.handle'
interface AuthState extends IHanle {
  user: IAuth | null
  emailValid: boolean
  isChangedPass: boolean
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  emailValid: false,
  isChangedPass: false
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state, action: PayloadAction) => {
      state.user = null
    },
    ResetIsChangePass: (state, action: PayloadAction) => {
      state.isChangedPass = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, handlePending)
      .addCase(loginAction.fulfilled, loginFulfilled)
      .addCase(loginAction.rejected, handleError)
      .addCase(fetchUserLogin.pending, handlePending)
      .addCase(fetchUserLogin.fulfilled, fetchUserLoginFulfilled)
      .addCase(fetchUserLogin.rejected, handleError)
      .addCase(checkEmailExistence.pending, handlePending)
      .addCase(checkEmailExistence.fulfilled, checkEmailExistenceFulfilled)
      .addCase(checkEmailExistence.rejected, handleError)
      .addCase(changePasswordAction.pending, handlePending)
      .addCase(changePasswordAction.fulfilled, changePasswordActionFulfilled)
      .addCase(changePasswordAction.rejected, handleError)
  }
})
export const { logOut, ResetIsChangePass } = authSlice.actions
const authReducer = authSlice.reducer
export default authReducer

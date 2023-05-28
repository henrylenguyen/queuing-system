import { createSlice } from '@reduxjs/toolkit'
import { IAuth } from 'constants/interface/auth.interface'
import { IHanle } from 'constants/interface/handle.interface'
import { loginAction } from 'redux/action/users/auth.action'
import { handleError, handlePending } from 'redux/handle'
import { loginFulfilled } from 'redux/handle/auth.handle'
interface AuthState extends IHanle {
  user: IAuth | null
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, handlePending)
      .addCase(loginAction.fulfilled, loginFulfilled)
      .addCase(loginAction.rejected, handleError)
  }
})
const authReducer = authSlice.reducer
export default authReducer

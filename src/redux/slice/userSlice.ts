import { createSlice } from '@reduxjs/toolkit'
import { fetchUsers } from 'redux/action/users/users.action'
import { IAuth } from 'constants/interface/auth.interface'
import { fetchUsersFulfilled } from 'redux/handle/user.handle'
import { handleError, handlePending } from 'redux/handle'
import { IHanle } from 'constants/interface/handle.interface'

export interface UserState extends IHanle {
  users: IAuth[]
}
const initialState: UserState = {
  users: [],
  isLoading: false,
  error: null
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, handlePending)
      .addCase(fetchUsers.fulfilled, fetchUsersFulfilled)
      .addCase(fetchUsers.rejected, handleError)
  }
})
const usersReducer = userSlice.reducer
export default usersReducer

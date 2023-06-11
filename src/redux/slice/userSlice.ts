import { createSlice } from '@reduxjs/toolkit'
import { addUser, fetchUserRole, fetchUsers } from 'redux/action/users/users.action'
import { IAuth } from 'constants/interface/auth.interface'
import { AddUserFulfilled, fetchUserRolesFulfilled, fetchUsersFulfilled } from 'redux/handle/user.handle'
import { handleError, handlePending } from 'redux/handle'
import { IHanle } from 'constants/interface/handle.interface'

export interface UserState extends IHanle {
  users: IAuth[]
  userRole: {
    id: string
    vaiTro: string
  }[]
  selectedRole: string
  addUserSuccess: {
    success:boolean,
    message: string
  }
}
const initialState: UserState = {
  users: [],
  isLoading: false,
  error: null,
  userRole: [],
  selectedRole: 'all',
  addUserSuccess: {
    success:false,
    message: ''
  }
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    onChangeSelectedRole: (state, action) => {
      state.selectedRole = action.payload
    },
    clearStatus: (state) => {
      state.addUserSuccess = {
        success: false,
        message: ''
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, handlePending)
      .addCase(fetchUsers.fulfilled, fetchUsersFulfilled)
      .addCase(fetchUsers.rejected, handleError)
      .addCase(fetchUserRole.pending, handlePending)
      .addCase(fetchUserRole.fulfilled, fetchUserRolesFulfilled)
      .addCase(fetchUserRole.rejected, handleError)
      .addCase(addUser.pending, handlePending)
      .addCase(addUser.fulfilled, AddUserFulfilled)
      .addCase(addUser.rejected, handleError)
  }
})
export const { onChangeSelectedRole, clearStatus } = userSlice.actions
const usersReducer = userSlice.reducer
export default usersReducer

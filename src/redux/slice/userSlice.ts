import { createSlice } from '@reduxjs/toolkit'
import { addUser, fetchUserDetail, fetchUserRole, fetchUsers, updateUser, uploadAvatar } from 'redux/action/users/users.action'
import { IAuth } from 'constants/interface/auth.interface'
import { AddUserFulfilled, UpdateUserFulfilled, UploadImageFulfilled, fetchUserDetailFulfilled, fetchUserRolesFulfilled, fetchUsersFulfilled } from 'redux/handle/user.handle'
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
    success: boolean
    message: string
  }
  userDetail: IAuth
  updateUserSuccess: {
    success: boolean
    message: string
  }
  isUploadSuccess: {
    success: boolean
    message: string
  }
}
const initialState: UserState = {
  users: [],
  isLoading: true,
  error: null,
  userRole: [],
  selectedRole: 'all',
  addUserSuccess: {
    success: false,
    message: ''
  },
  updateUserSuccess: {
    success: false,
    message: ''
  },
  userDetail: {
    id: '',
    email: '',
    hoTen: '',
    matKhau: '',
    soDienThoai: '',
    taiKhoan: '',
    trangThai: '',
    vaiTro: '',
    avatar: ''
  },
  isUploadSuccess: {
    success: false,
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
    },
    clearUpdateStatus: (state) => {
      state.updateUserSuccess = {
        success: false,
        message: ''
      }
    },
    clearUserDetail: (state)=>{
      state.userDetail = {
        id: '',
        email: '',
        hoTen: '',
        matKhau: '',
        soDienThoai: '',
        taiKhoan: '',
        trangThai: '',
        vaiTro: '',
        avatar: ''
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
      .addCase(fetchUserDetail.pending, handlePending)
      .addCase(fetchUserDetail.fulfilled, fetchUserDetailFulfilled)
      .addCase(fetchUserDetail.rejected, handleError)
      .addCase(updateUser.pending, handlePending)
      .addCase(updateUser.fulfilled, UpdateUserFulfilled)
      .addCase(updateUser.rejected, handleError)
      .addCase(uploadAvatar.pending, handlePending)
      .addCase(uploadAvatar.fulfilled, UploadImageFulfilled)
      .addCase(uploadAvatar.rejected, handleError)
  }
})
export const { onChangeSelectedRole, clearStatus, clearUserDetail, clearUpdateStatus } = userSlice.actions
const usersReducer = userSlice.reducer
export default usersReducer

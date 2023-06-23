import { createSlice } from '@reduxjs/toolkit'
import { addUser, fetchUserRole, fetchUsers } from 'redux/action/users/users.action'
import { IAuth } from 'constants/interface/auth.interface'
import { AddUserFulfilled, fetchUserRolesFulfilled, fetchUsersFulfilled } from 'redux/handle/user.handle'
import { handleError, handlePending } from 'redux/handle'
import { IHanle } from 'constants/interface/handle.interface'
import { IRole } from 'constants/interface/role.interface'
import { fetchRoleDetail, fetchRoles, fetchRolesName, postRole } from 'redux/action/roles/roleList.action'
import { fetchAddRoleFulfilled, fetchRoleDetailFulfilled, fetchRoleFulfilled, fetchRoleNameFulfilled } from 'redux/handle/role.handle'

export interface IRoleState extends IHanle {
  roles: IRole[]
  roleName: {
    id: string
    tenVaiTro: string
  }[]
  isAddSuccess: boolean
  roleDetail: IRole
}
const initialState: IRoleState = {
  roles: [],
  isLoading: true,
  error: null,
  roleName: [],
  isAddSuccess: false,
  roleDetail: {
    moTa: '',
    rule: '',
    tenVaiTro: '',
    soNguoiDung: 0
  }
}
const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    clearRoleStatus: (state) => {
      state.isAddSuccess = false
    },
    clearRoleDetail: (state)=>{
      state.roleDetail = {
    moTa: '',
    rule: '',
    tenVaiTro: '',
    soNguoiDung: 0
  }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, handlePending)
      .addCase(fetchRoles.fulfilled, fetchRoleFulfilled)
      .addCase(fetchRoles.rejected, handleError)
      .addCase(fetchRolesName.pending, handlePending)
      .addCase(fetchRolesName.fulfilled, fetchRoleNameFulfilled)
      .addCase(fetchRolesName.rejected, handleError)
      .addCase(postRole.pending, handlePending)
      .addCase(postRole.fulfilled, fetchAddRoleFulfilled)
      .addCase(postRole.rejected, handleError)
      .addCase(fetchRoleDetail.pending, handlePending)
      .addCase(fetchRoleDetail.fulfilled, fetchRoleDetailFulfilled)
      .addCase(fetchRoleDetail.rejected, handleError)
  }
})
export const { clearRoleStatus,clearRoleDetail } = roleSlice.actions
const roleReducer = roleSlice.reducer
export default roleReducer

import { createSlice } from '@reduxjs/toolkit'
import { addUser, fetchUserRole, fetchUsers } from 'redux/action/users/users.action'
import { IAuth } from 'constants/interface/auth.interface'
import { AddUserFulfilled, fetchUserRolesFulfilled, fetchUsersFulfilled } from 'redux/handle/user.handle'
import { handleError, handlePending } from 'redux/handle'
import { IHanle } from 'constants/interface/handle.interface'
import { IRole } from 'constants/interface/role.interface'
import { fetchRoles, fetchRolesName } from 'redux/action/roles/roleList.action'
import { fetchRoleFulfilled, fetchRoleNameFulfilled } from 'redux/handle/role.handle'

export interface IRoleState extends IHanle {
  roles: IRole[]
  roleName: {
    id: string
    tenVaiTro: string
  }[]
}
const initialState: IRoleState = {
  roles: [],
  isLoading: false,
  error: null,
  roleName: []
}
const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, handlePending)
      .addCase(fetchRoles.fulfilled, fetchRoleFulfilled)
      .addCase(fetchRoles.rejected, handleError)
      .addCase(fetchRolesName.pending, handlePending)
      .addCase(fetchRolesName.fulfilled, fetchRoleNameFulfilled)
      .addCase(fetchRolesName.rejected, handleError)
  }
})
export const {} = roleSlice.actions
const roleReducer = roleSlice.reducer
export default roleReducer

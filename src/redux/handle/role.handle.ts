import { IRoleState } from "redux/slice/role.slice"

export const fetchRoleFulfilled = (state: IRoleState, action: any) => {
  state.isLoading = false
  state.error = null
  state.roles = action.payload
}
export const fetchRoleNameFulfilled = (state: IRoleState, action: any) => {
  state.isLoading = false
  state.error = null
  state.roleName = action.payload
}
export const fetchAddRoleFulfilled = (state: IRoleState, action: any) => {
  state.isLoading = false
  state.error = null
  state.isAddSuccess = action.payload
}
export const fetchRoleDetailFulfilled = (state: IRoleState, action: any) => {
  state.isLoading = false
  state.error = null
  state.roleDetail = action.payload
}

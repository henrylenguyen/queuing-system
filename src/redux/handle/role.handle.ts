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

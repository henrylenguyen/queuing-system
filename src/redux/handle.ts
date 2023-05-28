export const handlePending = (state: any) => {
  state.isLoading = true
  state.error = null
}
export const handleError = (state: any, action: any) => {
  state.isLoading = false
  state.error = action.error.message || null
}

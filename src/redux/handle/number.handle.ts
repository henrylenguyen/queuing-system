import { INumberState } from 'redux/slice/number.slice'

export const fetchNumberFulfilled = (state: INumberState, action: any) => {
  state.isLoading = false
  state.error = null
  state.numbers = action.payload
}
export const fetchNumberServiceFulfilled = (state: INumberState, action: any) => {
  state.isLoading = false
  state.error = null
  state.serviceOfNumbers = action.payload
}
export const fetchNumberDeviceFulfilled = (state: INumberState, action: any) => {
  state.isLoading = false
  state.error = null
  state.deviceOfNumbers = action.payload
}
export const fetchNumberDetailFulfilled = (state: INumberState, action: any) => {
  state.isLoading = false
  state.error = null
  state.numberDetail = action.payload
}
export const fetchAddNumberFulfilled = (state: INumberState, action: any) => {
  state.isLoading = false
  state.error = null
  state.addNumberDetail = action.payload
}
export const fetchUpdateNumberFulfilled = (state: INumberState, action: any) => {
  state.isLoading = false
  state.error = null
  state.updateNumberDetail = action.payload
}
export const fetchNumberAlertFulfilled = (state: INumberState, action: any) => {
  state.isLoading = false
  state.error = null
  state.numberAlert = action.payload
}

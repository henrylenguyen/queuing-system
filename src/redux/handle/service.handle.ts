import { IServiceState } from 'redux/slice/services.slice'

export const fetchServicesFulfilled = (state: IServiceState, action: any) => {
  state.isLoading = false
  state.error = null
  state.services = action.payload
}
export const AddServicesFulfilled = (state: IServiceState, action: any) => {
  state.isLoading = false
  state.error = null
  state.isSuccess = true
}
export const fetchServicesDetailFulfilled = (state: IServiceState, action: any) => {
  state.isLoading = false
  state.error = null
  state.serviceDetail = action.payload
}

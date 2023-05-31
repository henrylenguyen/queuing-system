import { DeviceState } from 'redux/slice/devices.slice'

export const fetchDevicesFulfilled = (state: DeviceState, action: any) => {
  state.isLoading = false
  state.error = null
  state.devices = action.payload
}

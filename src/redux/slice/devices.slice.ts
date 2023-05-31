import { createSlice } from '@reduxjs/toolkit'
import { handleError, handlePending } from 'redux/handle'
import { IHanle } from 'constants/interface/handle.interface'
import { IDeviceManagement } from 'constants/interface/device.interface'
import { fetchDevices } from 'redux/action/devices/deviceList.action'
import { fetchDevicesFulfilled } from 'redux/handle/device.handle'

export interface DeviceState extends IHanle {
  devices: IDeviceManagement[]
  selectedStatus: string
  selectedConnection: string
}
const initialState: DeviceState = {
  devices: [],
  isLoading: false,
  error: null,
  selectedStatus: 'Tất cả', // Giá trị mặc định của dropdown trạng thái hoạt động
  selectedConnection: 'Tất cả' // Giá trị mặc định của dropdown trạng thái kết nối
}
const deviceSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    onChangeStatus: (state, action) => {
      state.selectedStatus = action.payload
    },
    onChangeConnection: (state, action) => {
      state.selectedConnection = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevices.pending, handlePending)
      .addCase(fetchDevices.fulfilled, fetchDevicesFulfilled)
      .addCase(fetchDevices.rejected, handleError)
  }
})
export const { onChangeStatus, onChangeConnection } = deviceSlice.actions
const devicesReducer = deviceSlice.reducer
export default devicesReducer

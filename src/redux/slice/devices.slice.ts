import { createSlice } from '@reduxjs/toolkit'
import { handleError, handlePending } from 'redux/handle'
import { IHanle } from 'constants/interface/handle.interface'
import { IDeviceManagement } from 'constants/interface/device.interface'
import { fetchDevices } from 'redux/action/devices/deviceList.action'
import { fetchDeviceDetailFulfilled, fetchDevicesFulfilled } from 'redux/handle/device.handle'
import { fetchDeviceDetail } from 'redux/action/devices/deviceDetail.action'

export interface DeviceState extends IHanle {
  devices: IDeviceManagement[]
  selectedStatus: string
  selectedConnection: string
  deviceDetail: IDeviceManagement
}
const initialState: DeviceState = {
  devices: [],
  isLoading: true,
  error: null,
  selectedStatus: 'all', // Giá trị mặc định của dropdown trạng thái hoạt động
  selectedConnection: 'all', // Giá trị mặc định của dropdown trạng thái kết nối
  deviceDetail: {
    id: '',
    maThietBi: '',
    tenThietBi: '',
    diaChiIP: '',
    trangThaiHoatDong: '',
    trangThaiKetNoi: '',
    dichVuSuDung: '',
    loaiThietBi: [],
    taiKhoan: '',
    matKhau: ''
  }
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
    },
    clearDeviceDetail: (state) => {
      state.deviceDetail = {
        id: '',
        maThietBi: '',
        tenThietBi: '',
        diaChiIP: '',
        trangThaiHoatDong: '',
        trangThaiKetNoi: '',
        dichVuSuDung: '',
        loaiThietBi: [],
        taiKhoan: '',
        matKhau: ''
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevices.pending, handlePending)
      .addCase(fetchDevices.fulfilled, fetchDevicesFulfilled)
      .addCase(fetchDevices.rejected, handleError)
      .addCase(fetchDeviceDetail.pending, handlePending)
      .addCase(fetchDeviceDetail.fulfilled, fetchDeviceDetailFulfilled)
      .addCase(fetchDeviceDetail.rejected, handleError)
  }
})
export const { onChangeStatus, onChangeConnection,clearDeviceDetail } = deviceSlice.actions
const devicesReducer = deviceSlice.reducer
export default devicesReducer

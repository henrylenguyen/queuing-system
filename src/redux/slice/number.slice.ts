import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IHanle } from 'constants/interface/handle.interface'
import { INumber } from 'constants/interface/number.interface'
import { addNumber, fetchNumberDetail, updateNumber } from 'redux/action/numbers/numberDetail.action'
import {
  fetchDeviceNameOfNumber,
  fetchNumbers,
  fetchNumbersAlert,
  fetchServicesNameOfNumber
} from 'redux/action/numbers/numberList.action'
import { handleError, handlePending } from 'redux/handle'
import {
  fetchAddNumberFulfilled,
  fetchNumberAlertFulfilled,
  fetchNumberDetailFulfilled,
  fetchNumberDeviceFulfilled,
  fetchNumberFulfilled,
  fetchNumberServiceFulfilled,
  fetchUpdateNumberFulfilled
} from 'redux/handle/number.handle'

export interface INumberState extends IHanle {
  numbers: INumber[]
  selectedStatus: string
  selectedServices: string
  selectedDevice: string
  selectedDateRange: [string, string]
  serviceOfNumbers: {
    id: string
    tenDichVu: string
  }[]
  deviceOfNumbers: {
    id: string
    tenNguonCap: string
  }[]
  numberDetail: INumber
  addNumberDetail: INumber
  serviceSelectedOfOnchange: string
  updateNumberDetail: boolean
  numberAlert: INumber[]
}
const initialState: INumberState = {
  numbers: [],
  isLoading: false,
  error: null,
  serviceOfNumbers: [],
  deviceOfNumbers: [],
  selectedStatus: 'all',
  selectedServices: 'all',
  selectedDevice: 'all',
  selectedDateRange: ['', ''],
  numberDetail: {
    id: '',
    STT: 0,
    tenKhachHang: '',
    tenDichVu: '',
    trangThai: '',
    nguonCap: '',
    thoiGianCap: '',
    hanSuDung: '',
    soDienThoai: '',
    email: ''
  },
  addNumberDetail: {
    tenDichVu: '',
    id: '',
    STT: 0,
    thoiGianCap: '',
    hanSuDung: '',
    trangThai: ''
  },
  serviceSelectedOfOnchange: '',
  updateNumberDetail: false,
  numberAlert: []
}

const numberSlice = createSlice({
  name: 'number',
  initialState,
  reducers: {
    onChangeNumberStatus: (state, action) => {
      state.selectedStatus = action.payload
    },
    onChangeNumberServices: (state, action) => {
      state.selectedServices = action.payload
    },
    onChangeNumberDevices: (state, action) => {
      state.selectedDevice = action.payload
    },
    onChangeNumberDatePicker: (state, action) => {
      state.selectedDateRange = action.payload
    },
    onChangeNumberServiceSelected: (state, action) => {
      state.serviceSelectedOfOnchange = action.payload
    },
    clearNumberDetail: (state) => {
      state.numberDetail = {
        id: '',
        STT: 0,
        tenKhachHang: '',
        tenDichVu: '',
        trangThai: '',
        nguonCap: '',
        thoiGianCap: '',
        hanSuDung: '',
        soDienThoai: '',
        email: ''
      }
    },
    clearStatusUpdate: (state) => {
      state.updateNumberDetail = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNumbers.pending, handlePending)
      .addCase(fetchNumbers.fulfilled, fetchNumberFulfilled)
      .addCase(fetchNumbers.rejected, handleError)
      .addCase(fetchServicesNameOfNumber.pending, handlePending)
      .addCase(fetchServicesNameOfNumber.fulfilled, fetchNumberServiceFulfilled)
      .addCase(fetchServicesNameOfNumber.rejected, handleError)
      .addCase(fetchDeviceNameOfNumber.pending, handlePending)
      .addCase(fetchDeviceNameOfNumber.fulfilled, fetchNumberDeviceFulfilled)
      .addCase(fetchDeviceNameOfNumber.rejected, handleError)
      .addCase(fetchNumberDetail.pending, handlePending)
      .addCase(fetchNumberDetail.fulfilled, fetchNumberDetailFulfilled)
      .addCase(fetchNumberDetail.rejected, handleError)
      .addCase(addNumber.pending, handlePending)
      .addCase(addNumber.fulfilled, fetchAddNumberFulfilled)
      .addCase(addNumber.rejected, handleError)
      .addCase(updateNumber.pending, handlePending)
      .addCase(updateNumber.fulfilled, fetchUpdateNumberFulfilled)
      .addCase(updateNumber.rejected, handleError)
      .addCase(fetchNumbersAlert.pending, handlePending)
      .addCase(fetchNumbersAlert.fulfilled, fetchNumberAlertFulfilled)
      .addCase(fetchNumbersAlert.rejected, handleError)
  }
})
export const {
  onChangeNumberStatus,
  onChangeNumberServices,
  onChangeNumberDevices,
  onChangeNumberDatePicker,
  clearNumberDetail,
  onChangeNumberServiceSelected,
  clearStatusUpdate
} = numberSlice.actions
const numberReducer = numberSlice.reducer
export default numberReducer

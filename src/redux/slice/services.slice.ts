import { createSlice } from '@reduxjs/toolkit'
import { IHanle } from 'constants/interface/handle.interface'
import { IServices } from 'constants/interface/service.interface'
import { fetchServiceDetail } from 'redux/action/services/serviceDetail.action'
import { addService, fetchServices, fetchServicesName } from 'redux/action/services/serviceList.action'
import { handleError, handlePending } from 'redux/handle'
import {
  AddServicesFulfilled,
  fetchServicesDetailFulfilled,
  fetchServicesFulfilled,
  fetchServicesNameFulfilled
} from 'redux/handle/service.handle'

export interface IServiceState extends IHanle {
  services: IServices[]
  selectedStatus: string
  selectedNumberStatus: string
  selectedService: string
  inputValue: []
  isSuccess: boolean
  serviceDetail: IServices
  serviceName: {
    id: string
    tenDichVu: string
  }[]
  selectedDateRange: [string, string]
}
const initialState: IServiceState = {
  services: [],
  isLoading: true,
  error: null,
  selectedStatus: 'all', // Giá trị mặc định của dropdown trạng thái hoạt động
  selectedNumberStatus: 'all', // Giá trị mặc định của dropdown trạng thái hoạt động
  selectedService: 'all', // Giá trị mặc định của dropdown dịch vụ sử dụng
  inputValue: [],
  isSuccess: false,
  serviceDetail: {
    id: '',
    maDichVu: '',
    moTa: '',
    quyTacCapSo: [],
    tenDichVu: '',
    trangThaiHoatDong: ''
  },
  serviceName: [],
  selectedDateRange: ["",'']
}
const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    onChangeServiceStatus: (state, action) => {
      state.selectedStatus = action.payload
    },
    onChangeInputValue: (state, action) => {
      state.inputValue = action.payload
    },
    onChangeServiceName: (state, action) => {
      state.selectedService = action.payload
    },
    clearServiceDetail: (state) => {
      state.serviceDetail = {
        id: '',
        maDichVu: '',
        moTa: '',
        quyTacCapSo: [],
        tenDichVu: '',
        trangThaiHoatDong: ''
      }
    },
    resetStatus: (state) => {
      state.isSuccess = false
    },
    onChangeNumberDatePickerService: (state, action) => {
      state.selectedDateRange = action.payload
    },
    onChangeNumberOfSevicesStatus: (state, action) => {
      state.selectedNumberStatus = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, handlePending)
      .addCase(fetchServices.fulfilled, fetchServicesFulfilled)
      .addCase(fetchServices.rejected, handleError)
      .addCase(addService.pending, handlePending)
      .addCase(addService.fulfilled, AddServicesFulfilled)
      .addCase(addService.rejected, handleError)
      .addCase(fetchServiceDetail.pending, handlePending)
      .addCase(fetchServiceDetail.fulfilled, fetchServicesDetailFulfilled)
      .addCase(fetchServiceDetail.rejected, handleError)
      .addCase(fetchServicesName.pending, handlePending)
      .addCase(fetchServicesName.fulfilled, fetchServicesNameFulfilled)
      .addCase(fetchServicesName.rejected, handleError)
  }
})
export const {
  onChangeServiceStatus,
  onChangeInputValue,
  resetStatus,
  clearServiceDetail,
  onChangeServiceName,
  onChangeNumberDatePickerService,
  onChangeNumberOfSevicesStatus
} = serviceSlice.actions
const servicesReducer = serviceSlice.reducer
export default servicesReducer

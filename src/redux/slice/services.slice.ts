import { createSlice } from '@reduxjs/toolkit'
import { IHanle } from 'constants/interface/handle.interface'
import { IServices } from 'constants/interface/service.interface'
import { addService, fetchServices } from 'redux/action/services/serviceList.action'
import { handleError, handlePending } from 'redux/handle'
import { AddServicesFulfilled, fetchServicesFulfilled } from 'redux/handle/service.handle'

export interface IServiceState extends IHanle {
  services: IServices[]
  selectedStatus: string
  inputValue: []
  isSuccess: boolean
}
const initialState: IServiceState = {
  services: [],
  isLoading: true,
  error: null,
  selectedStatus: 'all', // Giá trị mặc định của dropdown trạng thái hoạt động
  inputValue: [],
  isSuccess: false
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
    resetStatus: (state) => {
      state.isSuccess = false
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
  }
})
export const { onChangeServiceStatus, onChangeInputValue,resetStatus } = serviceSlice.actions
const servicesReducer = serviceSlice.reducer
export default servicesReducer

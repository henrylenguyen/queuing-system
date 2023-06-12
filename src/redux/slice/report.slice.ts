import { createSlice } from '@reduxjs/toolkit'
import { IHanle } from 'constants/interface/handle.interface'
import { INumber } from 'constants/interface/number.interface'
import { IReport, IReportDeviceAndService } from 'constants/interface/report.interface'
import { fetchReport, fetchReportDeviceAndService } from 'redux/action/report/report.action'

import { handleError, handlePending } from 'redux/handle'
import { fetchReportNumberFulfilled, fetchReportServiceAndDeviceFulfilled } from 'redux/handle/report.hanle'

export interface IReportState extends IHanle {
  reports: IReport
  selectedDateRange: [string, string]
  reportsServiceAndDevice: IReportDeviceAndService[]
}
const initialState: IReportState = {
  reports: {
    total: [],
    numbers: []
  },
  reportsServiceAndDevice: [],
  isLoading: true,
  error: null,
  selectedDateRange: ['', '']
}

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    onChangeNumberDatePickerReport: (state, action) => {
      state.selectedDateRange = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReport.pending, handlePending)
      .addCase(fetchReport.fulfilled, fetchReportNumberFulfilled)
      .addCase(fetchReport.rejected, handleError)
      .addCase(fetchReportDeviceAndService.pending, handlePending)
      .addCase(fetchReportDeviceAndService.fulfilled, fetchReportServiceAndDeviceFulfilled)
      .addCase(fetchReportDeviceAndService.rejected, handleError)
  }
})
export const { onChangeNumberDatePickerReport } = reportSlice.actions
const reportReducer = reportSlice.reducer
export default reportReducer

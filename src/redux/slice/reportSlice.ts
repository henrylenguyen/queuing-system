import { createSlice } from '@reduxjs/toolkit'
import { IHanle } from 'constants/interface/handle.interface'
import { INumber } from 'constants/interface/number.interface'
import { IReport } from 'constants/interface/report.interface'
import { fetchReport } from 'redux/action/report/report.action'

import { handleError, handlePending } from 'redux/handle'
import { fetchReportNumberFulfilled } from 'redux/handle/report.hanle'

export interface IReportState extends IHanle {
  reports: IReport
  selectedDateRange: [string, string]
}
const initialState: IReportState = {
  reports: {
    total: [],
    sortedNumbers: []
  },
  isLoading: true,
  error: null,
  selectedDateRange: ['', '']
}

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReport.pending, handlePending)
      .addCase(fetchReport.fulfilled, fetchReportNumberFulfilled)
      .addCase(fetchReport.rejected, handleError)
  }
})
export const {} = reportSlice.actions
const reportReducer = reportSlice.reducer
export default reportReducer

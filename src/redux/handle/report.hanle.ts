import { IReportState } from "redux/slice/reportSlice"

export const fetchReportNumberFulfilled = (state: IReportState, action: any) => {
  state.isLoading = false
  state.error = null
  state.reports = action.payload
}
export const fetchReportServiceAndDeviceFulfilled = (state: IReportState, action: any) => {
  state.isLoading = false
  state.error = null
  state.reportsServiceAndDevice = action.payload
}

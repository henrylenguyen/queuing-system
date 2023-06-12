import { createSlice } from "@reduxjs/toolkit"
import { IDiary } from "constants/interface/diary.interface"
import { IHanle } from "constants/interface/handle.interface"
import { fetchDiaries } from "redux/action/diary/diary.action"
import { handleError, handlePending } from "redux/handle"
import { fetchDiaryFulfilled } from "redux/handle/diary.handle"

export interface IDiaryState extends IHanle {
  diaries: IDiary[]
  selectedDiaryDateRange: [string, string]
}

const initialState: IDiaryState = {
  diaries: [],
  isLoading: true,
  error: null,
  selectedDiaryDateRange: ['', '']
}
const diarySlice = createSlice({
  name: 'diary',
  initialState,
  reducers: {
    onChangeDiaryDatePickerReport: (state, action) => {
      state.selectedDiaryDateRange = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiaries.pending, handlePending)
      .addCase(fetchDiaries.fulfilled, fetchDiaryFulfilled)
      .addCase(fetchDiaries.rejected, handleError)
  }
})
export const {onChangeDiaryDatePickerReport} = diarySlice.actions
const diaryReducer = diarySlice.reducer
export default diaryReducer

import { IDiaryState } from "redux/slice/diary.slice"

export const fetchDiaryFulfilled = (state: IDiaryState, action: any) => {
  state.isLoading = false
  state.error = null
  state.diaries = action.payload
}

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface INav {
  isActive: boolean
}
const initialState: INav = {
  isActive: false
}
const navSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    changeStateNav: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload
    }
  }
})
export const { changeStateNav } = navSlice.actions
export default navSlice.reducer

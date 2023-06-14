import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface INav {
  isActive: boolean
  isClick: boolean
  isSetting: boolean
}
const initialState: INav = {
  isActive: false,
  isClick: false,
  isSetting: false
}
const navSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    changeStateNav: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload
    },
    changeStateSettingNav: (state, action: PayloadAction<boolean>) => {
      state.isClick = action.payload
    },
    changeSettingStatus: (state, action: PayloadAction<boolean>) => {
      state.isSetting = action.payload
    }
  }
})
export const { changeStateNav, changeStateSettingNav,changeSettingStatus } = navSlice.actions
export default navSlice.reducer

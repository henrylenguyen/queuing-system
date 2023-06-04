import { doc, getDoc } from '@firebase/firestore'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IServices } from 'constants/interface/service.interface'
import { clearServiceDetail } from 'redux/slice/services.slice'
import db from 'service/db.connect'

// -------------------- LẤY THÔNG TIN THIẾT BỊ  ---------------------
export const fetchServiceDetail = createAsyncThunk('auth/fetchServiceDetail', async (id: string, { dispatch }) => {
  try {
    dispatch(clearServiceDetail()) // Xóa dữ liệu chi tiết thiết bị hiện tại

    const deviceDoc = await getDoc(doc(db, 'services', id))
    if (deviceDoc.exists()) {
      const deviceData = deviceDoc.data() as IServices
      return { ...deviceData, id }
    } else {
      throw new Error('Dịch vụ không tồn tại')
    }
  } catch (error) {
    console.error(error)
    throw error
  }
})

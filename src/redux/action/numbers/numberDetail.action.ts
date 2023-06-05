import { doc, getDoc, updateDoc } from '@firebase/firestore'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { INumber } from 'constants/interface/number.interface'
import { clearNumberDetail } from 'redux/slice/numberSlice'
import db from 'service/db.connect'
import { format } from 'date-fns'

// -------------------- LẤY THÔNG TIN CẤP SỐ  ---------------------

export const fetchNumberDetail = createAsyncThunk('auth/fetchNumberDetail', async (id: string, { dispatch }) => {
  try {
    dispatch(clearNumberDetail()) // Xóa dữ liệu chi tiết SỐ hiện tại

    const numberDoc = await getDoc(doc(db, 'numbers', id))
    if (numberDoc.exists()) {
      const numberData = numberDoc.data()

      // Định dạng dữ liệu hanSuDung và thoiGianCap
      const formattedHanSuDung = format(numberData.hanSuDung.toDate(), 'dd/MM/yyyy HH:mm:ss')
      const formattedThoiGianCap = format(numberData.thoiGianCap.toDate(), 'dd/MM/yyyy HH:mm:ss')

      return { ...numberData, id, hanSuDung: formattedHanSuDung, thoiGianCap: formattedThoiGianCap }
    } else {
      throw new Error('Số không tồn tại')
    }
  } catch (error) {
    console.error(error)
    throw error
  }
})

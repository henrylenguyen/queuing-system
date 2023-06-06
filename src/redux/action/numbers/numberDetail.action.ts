import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp, updateDoc } from '@firebase/firestore'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { INumber } from 'constants/interface/number.interface'
import { clearNumberDetail } from 'redux/slice/numberSlice'
import db from 'service/db.connect'
import { endOfDay, format } from 'date-fns'

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

export const addNumber = createAsyncThunk('auth/addNumber', async (tenDichVu: string) => {
  try {
    const numberRef = collection(db, 'numbers')

    // Lấy danh sách số từ Firestore
    const snapshot = await getDocs(numberRef)
    const numbers = snapshot.docs.map((doc) => doc.data())

    // Tìm số lớn nhất trong danh sách
    const maxSTT = numbers.reduce((max, number) => Math.max(max, number.STT), 0)

    // Tạo thông tin cho số mới
    const newNumberData = {
      STT: maxSTT + 1,
      tenDichVu: tenDichVu,
      thoiGianCap: serverTimestamp(),
      hanSuDung: endOfDay(new Date()),
      trangThai: 'pending'
    }

    // Thêm số mới vào Firestore
    const newNumberRef = await addDoc(numberRef, newNumberData)
  } catch (error) {
    console.error('Lỗi khi thêm số mới:', error)
    throw error
  }
})

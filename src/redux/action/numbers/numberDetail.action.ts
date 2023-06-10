import { Timestamp, addDoc, collection, doc, getDoc, getDocs, updateDoc } from '@firebase/firestore'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IAddNumber } from 'constants/interface/number.interface'
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

export const addNumber = createAsyncThunk('auth/addNumber', async (data: IAddNumber) => {
  const { tenDichVu, nguonCap, tenKhachHang, email, soDienThoai } = data

  // Gán giá trị mặc định cho các trường không được cung cấp từ form
  const defaultNguonCap = 'Kiosk'
  const defaultTenKhachHang = ''
  const defaultEmail = ''
  const defaultSoDienThoai = ''

  const numberData = {
    STT: 0,
    tenDichVu: tenDichVu,
    thoiGianCap: Timestamp.fromDate(new Date()),
    hanSuDung: Timestamp.fromDate(endOfDay(new Date())),
    trangThai: 'pending',
    nguonCap: nguonCap || defaultNguonCap,
    tenKhachHang: tenKhachHang || defaultTenKhachHang,
    email: email || defaultEmail,
    soDienThoai: soDienThoai || defaultSoDienThoai
  }

  try {
    const numberRef = collection(db, 'numbers')

    // Lấy danh sách số từ Firestore
    const snapshot = await getDocs(numberRef)
    const numbers = snapshot.docs.map((doc) => doc.data())

    // Tìm số lớn nhất trong danh sách
    const maxSTT = numbers.reduce((max, number) => Math.max(max, number.STT), 0)

    // Cập nhật STT cho số mới
    numberData.STT = maxSTT + 1

    // Thêm số mới vào Firestore
    const newNumberRef = await addDoc(numberRef, numberData)
    // Format lại thời gian sử dụng và thời gian cấp
    const formattedHanSuDung = format(numberData.hanSuDung.toDate(), 'dd/MM/yyyy HH:mm:ss')
    const formattedThoiGianCap = format(numberData.thoiGianCap.toDate(), 'dd/MM/yyyy HH:mm:ss')

    // Tạo một đối tượng mới với các trường đã được định dạng
    const formattedNewNumberData = {
      ...numberData,
      hanSuDung: formattedHanSuDung,
      thoiGianCap: formattedThoiGianCap
    }

    return { id: newNumberRef.id, ...formattedNewNumberData }
  } catch (error) {
    console.error('Lỗi khi thêm số mới:', error)
    throw error
  }
})

//----------------------CẬP NHẬT TRẠNG THÁI--------------------------

export const updateNumber = createAsyncThunk('auth/updateNumber', async (data: { id: string; trangThai: string }) => {
  const { id, trangThai } = data

  try {
    const numberRef = doc(db, 'numbers', id)
    const snapshot = await getDoc(numberRef)

    if (snapshot.exists()) {
      // Cập nhật trạng thái của số
      await updateDoc(numberRef, { trangThai })

      return true
    } else {
      throw new Error('ID không tồn tại')
    }
  } catch (error) {
    throw new Error('Lỗi khi cập nhật trạng thái')
  }
})

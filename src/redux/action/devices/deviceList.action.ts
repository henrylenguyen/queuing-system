import { createAsyncThunk } from '@reduxjs/toolkit'
import db from 'service/db.connect'
import { collection, getDocs } from 'firebase/firestore'

export const fetchDevices = createAsyncThunk('device/fetchDevices', async () => {
  try {
    // Lấy danh sách devices từ Firestore
    const devicesRef = collection(db, 'devices')
    const snapshot = await getDocs(devicesRef)

    // Trích xuất dữ liệu từ snapshot
    const devices = snapshot.docs.map((doc) => doc.data())

    return devices
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Lỗi khi lấy dữ liệu:', error)
    throw error
  }
})

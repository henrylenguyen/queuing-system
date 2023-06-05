import { createAsyncThunk } from '@reduxjs/toolkit'
import db from 'service/db.connect'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { IDeviceManagement } from 'constants/interface/device.interface'

// ------------------------LẤY DANH SÁCH THIẾT BỊ-------------------------
export const fetchDevices = createAsyncThunk('device/fetchDevices', async () => {
  try {
    const devicesRef = collection(db, 'devices')
    const snapshot = await getDocs(devicesRef)

    const devices = snapshot.docs.map((doc) => {
      const deviceData = doc.data()
      const deviceId = doc.id
      return { id: deviceId, ...deviceData }
    })

    return devices
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error)
    throw error
  }
})

// -----------------------------TẠO MỚI THIẾT BỊ---------------------------
export const postDevices = createAsyncThunk('device/postDevices', async (device: IDeviceManagement) => {
  try {
    // Thêm dữ liệu vào Firestore
    const newDevice = {
      ...device,
      trangThaiHoatDong: true,
      trangThaiKetNoi: true
    }
    const devicesRef = collection(db, 'devices')
    await addDoc(devicesRef, newDevice)

    // Trả về dữ liệu đã được thêm
    console.log('file: deviceList.action.ts:42 ~ newDevice:', newDevice)
    return newDevice
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Lỗi khi thêm dữ liệu:', error)
    throw error
  }
})

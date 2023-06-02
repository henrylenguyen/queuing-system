
import { doc, getDoc, updateDoc } from '@firebase/firestore'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IDeviceManagement } from 'constants/interface/device.interface'
import { clearDeviceDetail } from 'redux/slice/devices.slice'
import db from 'service/db.connect'

// -------------------- LẤY THÔNG TIN THIẾT BỊ  ---------------------
export const fetchDeviceDetail = createAsyncThunk('auth/fetchDeviceDetail', async (id: string, { dispatch }) => {
  try {
    dispatch(clearDeviceDetail()) // Xóa dữ liệu chi tiết thiết bị hiện tại

    const deviceDoc = await getDoc(doc(db, 'devices', id))
    if (deviceDoc.exists()) {
      const deviceData = deviceDoc.data() as IDeviceManagement
      return { ...deviceData, id }
    } else {
      throw new Error('Thiết bị không tồn tại')
    }
  } catch (error) {
    console.error(error)
    throw error
  }
})
// -------------------CẬP NHẬT THIẾT BỊ DỰA VÀO ID---------
export const updateDevice = createAsyncThunk(
  'auth/updateDevice',
  async ({ id, updatedDeviceData }: { id: string; updatedDeviceData: Partial<IDeviceManagement> }) => {
    console.log("file: deviceDetail.action.ts:26 ~ updatedDeviceData:", updatedDeviceData)
    try {
      const deviceDocRef = doc(db, 'devices', id)
      const deviceDoc = await getDoc(deviceDocRef)
      if (deviceDoc.exists()) {
        const deviceData = deviceDoc.data() as IDeviceManagement
        const updatedData = { ...deviceData, ...updatedDeviceData }
        await updateDoc(deviceDocRef, updatedData)
        return { ...updatedData, id }
      } else {
        throw new Error('Thiết bị không tồn tại')
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)


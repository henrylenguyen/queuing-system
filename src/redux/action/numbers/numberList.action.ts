import { collection, getDocs } from '@firebase/firestore'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { format } from 'date-fns' // import hàm format từ thư viện date-fns
import db from 'service/db.connect'

// ------------------------LẤY DANH SÁCH CẤP SỐ-------------------------

export const fetchNumbers = createAsyncThunk('device/fetchNumbers', async () => {
  try {
    const numberRef = collection(db, 'numbers')
    const snapshot = await getDocs(numberRef)

    const numbers = snapshot.docs.map((doc) => {
      const numberData = doc.data()
      const numberID = doc.id
      // Format lại thời gian sử dụng và thời gian cấp
      const formattedHanSuDung = format(numberData.hanSuDung.toDate(), 'dd/MM/yyyy HH:mm:ss')
      const formattedThoiGianCap = format(numberData.thoiGianCap.toDate(), 'dd/MM/yyyy HH:mm:ss')

      // Tạo một đối tượng mới với các trường đã được định dạng
      const formattedNumberData = {
        ...numberData,
        hanSuDung: formattedHanSuDung,
        thoiGianCap: formattedThoiGianCap
      }

      return { id: numberID, ...formattedNumberData }
    })

    return numbers
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error)
    throw error
  }
})
// --------------------LẤY RA TÊN DỊCH VỤ TRONG NUMBERS------------------------

export const fetchServicesNameOfNumber = createAsyncThunk('device/fetchServicesNameOfNumber', async () => {
  try {
    const serviceRef = collection(db, 'numbers')
    const snapshot = await getDocs(serviceRef)

    const services = snapshot.docs.map((doc) => {
      const serviceData = doc.data()
      const serviceID = doc.id
      const tenDichVu = serviceData.tenDichVu // Lấy giá trị của trường "tenDichVu"

      return { id: serviceID, tenDichVu } // Trả về tên dịch vụ và id
    })

    return services
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error)
    throw error
  }
})
// ------------------LẤY RA TÊN NGUỒN CẤP TRONG NUMBERS------------------------

export const fetchDeviceNameOfNumber = createAsyncThunk('device/fetchDeviceNameOfNumber', async () => {
  try {
    const deviceRef = collection(db, 'numbers')
    const snapshot = await getDocs(deviceRef)

    const devices = snapshot.docs.map((doc) => {
      const deviceData = doc.data()
      const deviceID = doc.id
      const tenNguonCap = deviceData.nguonCap // Lấy giá trị của trường "nguonCap"

      return { id: deviceID, tenNguonCap } // Trả về tên dịch vụ và id
    })

    return devices
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error)
    throw error
  }
})

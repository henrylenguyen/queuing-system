import { collection, getDocs } from '@firebase/firestore'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { INumber } from 'constants/interface/number.interface'
import { format } from 'date-fns' // import hàm format từ thư viện date-fns
import db from 'service/db.connect'

// ------------------------LẤY DANH SÁCH CẤP SỐ-------------------------
interface numbers {
  hanSuDung: string
  thoiGianCap: string
  id: string
}
export const fetchNumbers = createAsyncThunk('number/fetchNumbers', async () => {
  try {
    const numberRef = collection(db, 'numbers')
    const snapshot = await getDocs(numberRef)

    const numbers = snapshot.docs.map((doc) => {
      const numberData = doc.data() as { STT: number; [key: string]: any }

      const numberID = doc.id
      const formattedHanSuDung = format(numberData.hanSuDung.toDate(), 'dd/MM/yyyy HH:mm:ss')
      const formattedThoiGianCap = format(numberData.thoiGianCap.toDate(), 'dd/MM/yyyy HH:mm:ss')

      const formattedNumberData = {
        ...numberData,
        hanSuDung: formattedHanSuDung,
        thoiGianCap: formattedThoiGianCap
      }

      return { id: numberID, ...formattedNumberData }
    })

    const sortedNumbers = numbers.sort((a, b) => a.STT - b.STT) // Sắp xếp theo trường STT

    return sortedNumbers
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error)
    throw error
  }
})

// --------------------LẤY RA TÊN DỊCH VỤ TRONG NUMBERS------------------------

export const fetchServicesNameOfNumber = createAsyncThunk('number/fetchServicesNameOfNumber', async () => {
  try {
    const serviceRef = collection(db, 'numbers')
    const snapshot = await getDocs(serviceRef)

    const uniqueNames = new Set<string>() // Chỉ định kiểu dữ liệu của Set là string

    const services = snapshot.docs.reduce((result, doc) => {
      const serviceData = doc.data()
      const serviceID = doc.id
      const tenDichVu = serviceData.tenDichVu // Lấy giá trị của trường "tenDichVu"

      if (!uniqueNames.has(tenDichVu)) {
        uniqueNames.add(tenDichVu) // Thêm tên vào Set để kiểm tra trùng lặp
        result.push({ id: serviceID, tenDichVu }) // Trả về tên dịch vụ và id
      }

      return result
    }, [] as { id: string; tenDichVu: string }[]) // Sử dụng kiểu dữ liệu mặc định cho mảng khi không có phần tử

    return services
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error)
    throw error
  }
})

// ------------------LẤY RA TÊN NGUỒN CẤP TRONG NUMBERS------------------------
export const fetchDeviceNameOfNumber = createAsyncThunk('number/fetchDeviceNameOfNumber', async () => {
  try {
    const deviceRef = collection(db, 'numbers')
    const snapshot = await getDocs(deviceRef)

    const uniqueNames = new Set<string>() // Chỉ định kiểu dữ liệu của Set là string

    const devices: { id: string; tenNguonCap: any }[] = snapshot.docs.reduce((result, doc) => {
      const deviceData = doc.data()
      const deviceID: string = doc.id // Chỉ định kiểu dữ liệu của deviceID là string
      const tenNguonCap: any = deviceData.nguonCap // Chỉ định kiểu dữ liệu của tenNguonCap

      if (!uniqueNames.has(tenNguonCap)) {
        uniqueNames.add(tenNguonCap) // Thêm tên vào Set để kiểm tra trùng lặp
        result.push({ id: deviceID, tenNguonCap }) // Trả về tên dịch vụ và id
      }

      return result
    }, [] as { id: string; tenNguonCap: any }[]) // Sử dụng kiểu dữ liệu mặc định cho mảng khi không có phần tử

    return devices
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error)
    throw error
  }
})

// ------------------LẤY RA DANH SÁCH CẤP SỐ TỐI ĐA 10 SỐ MỚI-----------------

export const fetchNumbersAlert = createAsyncThunk('number/fetchNumbersAlert', async () => {
  try {
    const numberRef = collection(db, 'numbers')
    const snapshot = await getDocs(numberRef)

    const numbers = snapshot.docs.map((doc) => {
      const numberData = doc.data() as { STT: number; [key: string]: any }

      const numberID = doc.id
      const formattedHanSuDung = format(numberData.hanSuDung.toDate(), 'dd/MM/yyyy HH:mm:ss')
      const formattedThoiGianCap = format(numberData.thoiGianCap.toDate(), 'dd/MM/yyyy HH:mm:ss')

      const formattedNumberData = {
        ...numberData,
        hanSuDung: formattedHanSuDung,
        thoiGianCap: formattedThoiGianCap
      }

      return { id: numberID, ...formattedNumberData }
    })

    const sortedNumbers = numbers.sort((a, b) => b.STT - a.STT) // Sắp xếp theo trường STT ngược lại
    const maxNumbers = sortedNumbers.slice(0, 10) // Lấy tối đa 10 số đầu tiên từ mảng sortedNumbers

    return maxNumbers
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error)
    throw error
  }
})

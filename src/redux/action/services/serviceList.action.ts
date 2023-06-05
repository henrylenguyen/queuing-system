import { createAsyncThunk } from '@reduxjs/toolkit'
import db from 'service/db.connect'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'

// ------------------------LẤY DANH SÁCH THIẾT BỊ-------------------------
export const fetchServices = createAsyncThunk('device/fetchServices', async () => {
  try {
    const servicesRef = collection(db, 'services')
    const snapshot = await getDocs(servicesRef)

    const services = snapshot.docs.map((doc) => {
      const serviceData = doc.data()
      const serviceID = doc.id
      return { id: serviceID, ...serviceData }
    })

    return services
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error)
    throw error
  }
})

// --------------------THÊM Dịch vụ--------------------------

export const addService = createAsyncThunk('device/addService', async (data: any) => {
  try {
    const { tenDichVu } = data

    // Chuyển đổi `tenDichVu` sang chữ thường để so sánh
    const lowercaseTenDichVu = tenDichVu.toLowerCase()

    // Kiểm tra xem `tenDichVu` có trùng với bất kỳ tài liệu nào trong Firestore hay không
    const servicesRef = collection(db, 'services')
    const q = query(servicesRef, where('tenDichVu', '==', lowercaseTenDichVu))
    const snapshot = await getDocs(q)

    if (!snapshot.empty) {
      throw new Error('Tên dịch vụ đã tồn tại trong hệ thống')
    }

    // Nếu không có lỗi, tiến hành thêm dữ liệu vào Firestore
    const newService = {
      ...data,
      tenDichVu: lowercaseTenDichVu, // Chuyển đổi lại thành chữ thường trong newService
      trangThaiHoatDong: true
    }
    await addDoc(servicesRef, newService)

    return newService
  } catch (error) {
    console.error('Lỗi khi thêm dịch vụ:', error)
    throw error
  }
})

// ---------------------------LẤY RA TÊN DỊCH VỤ------------------------

export const fetchServicesName = createAsyncThunk('device/fetchServicesName', async () => {
  try {
    const serviceRef = collection(db, 'services')
    const snapshot = await getDocs(serviceRef)

    const services = snapshot.docs.map((doc) => {
      const serviceData = doc.data()
      const serviceID = serviceData.maDichVu
      const tenDichVu = serviceData.tenDichVu // Lấy giá trị của trường "tenDichVu"

      return { id: serviceID, tenDichVu } // Trả về tên dịch vụ và id
    })

    return services
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error)
    throw error
  }
})

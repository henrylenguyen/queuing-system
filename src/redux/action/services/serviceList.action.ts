import { createAsyncThunk } from '@reduxjs/toolkit'
import db from 'service/db.connect'
import { addDoc, collection, getDocs } from 'firebase/firestore'

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




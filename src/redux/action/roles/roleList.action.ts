import { collection, getDocs, query, where } from '@firebase/firestore'
import { createAsyncThunk } from '@reduxjs/toolkit'
import db from 'service/db.connect'

export const fetchRoles = createAsyncThunk('role/fetchRoles', async () => {
  try {
    const roleRef = collection(db, 'roles')
    const snapshot = await getDocs(roleRef)

    const role = snapshot.docs.map(async (doc) => {
      const roleData = doc.data()
      const roleID = doc.id

      // Tính toán số lượng vai trò dựa vào cột "vaiTro" trong bảng "users"
      const usersSnapshot = await getDocs(query(collection(db, 'users'), where('vaiTro', '==', roleData.tenVaiTro)))
      const soNguoiDung = usersSnapshot.size

      return { id: roleID, ...roleData, soNguoiDung }
    })

    // Chờ tất cả các promise trong mảng "role" hoàn thành
    const roles = await Promise.all(role)

    return roles
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error)
    throw error
  }
})


export const fetchRolesName = createAsyncThunk('role/fetchRolesName', async () => {
  try {
    const roleRef = collection(db, 'roles')
    const snapshot = await getDocs(roleRef)

    const roleName = snapshot.docs.map((doc) => {
      const { tenVaiTro } = doc.data()
      const roleNameID = doc.id
      return { id: roleNameID, tenVaiTro }
    })

    return roleName
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error)
    throw error
  }
})



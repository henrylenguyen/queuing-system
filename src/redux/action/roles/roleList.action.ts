import { collection, getDocs } from '@firebase/firestore'
import { createAsyncThunk } from '@reduxjs/toolkit'
import db from 'service/db.connect'

export const fetchRoles = createAsyncThunk('role/fetchRoles', async () => {
  try {
    const roleRef = collection(db, 'roles')
    const snapshot = await getDocs(roleRef)

    const role = snapshot.docs.map((doc) => {
      const roleData = doc.data()
      const roleID = doc.id
      return { id: roleID, ...roleData }
    })

    return role
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



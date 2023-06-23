import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from '@firebase/firestore'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IRole } from 'constants/interface/role.interface'
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




export const postRole = createAsyncThunk('role/postRole', async (roleData: IRole) => {
  try {
    const roleQuerySnapshot = await getDocs(
      query(collection(db, 'roles'), where('tenVaiTro', '==', roleData.tenVaiTro))
    )
    if (!roleQuerySnapshot.empty) {
      
      throw new Error('Tên vai trò đã tồn tại')
    }

    const docRef = await addDoc(collection(db, 'roles'), roleData)
    if (docRef) {
      return true
    }
  } catch (error) {
    throw new Error(`${error}`)
  }
})



export const fetchRoleDetail = createAsyncThunk('auth/fetchRoleDetail', async (id: string) => {
  try {

    const roleDoc = await getDoc(doc(db, 'roles', id))
    if (roleDoc.exists()) {
      const roleData = roleDoc.data() as IRole
      return { ...roleData, id }
    } else {
      throw new Error('Vai trò không tồn tại')
    }
  } catch (error) {
    console.error(error)
    throw error
  }
})


export const updateRole = createAsyncThunk(
  'role/updateRole',
  async ({ id, data }: { id: string; data: Partial<IRole> }) => {
    try {
      const roleDocRef = doc(db, 'roles', id)
      const roleDoc = await getDoc(roleDocRef)
      if (roleDoc.exists()) {
        const roleData = roleDoc.data() as IRole
        const updatedData = { ...roleData, ...data }
        await updateDoc(roleDocRef, updatedData)
        return true
      } else {
        throw new Error('Vai trò không tồn tại')
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)

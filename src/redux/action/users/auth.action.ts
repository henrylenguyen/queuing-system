import { createAsyncThunk } from '@reduxjs/toolkit'
import { IAuth } from 'constants/interface/auth.interface'
import db from 'service/db.connect'
import { collection, query, where, limit, getDocs, getDoc, doc } from 'firebase/firestore'
import bcrypt from 'bcryptjs'
interface LoginPayload {
  taiKhoan: string
  matKhau: string
}

export const loginAction = createAsyncThunk('auth/login', async (payload: LoginPayload) => {
  try {
    const { taiKhoan, matKhau } = payload

    // Check account or email
    const querySnapshot = await getDocs(query(collection(db, 'users'), where('taiKhoan', '==', taiKhoan), limit(1)))

    if (querySnapshot.empty) {
      throw new Error('Tài khoản không hợp lệ')
    }

    const userDoc = querySnapshot.docs[0]
    const userData = userDoc.data() as IAuth
    // lấy ra id của firestore
    const id = userDoc.id
    const isPasswordValid = await bcrypt.compare(matKhau, userData.matKhau)
    if (!isPasswordValid) {
      throw new Error('Mật khẩu không hợp lệ')
    }

    return { ...userData, id }
  } catch (error) {
    console.error(error)
    throw error
  }
})

// -------------------- LẤY THÔNG TIN USER ĐANG ĐĂNG NHẬP ---------------------

export const fetchUserLogin = createAsyncThunk('auth/fetchUserLogin', async (id: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', id))
    if (userDoc.exists()) {
      const userData = userDoc.data() as IAuth
      return { ...userData, id }
    } else {
      throw new Error('Tài khoản không tồn tại')
    }
  } catch (error) {
    console.error(error)
    throw error
  }
})

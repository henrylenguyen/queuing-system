import { createAsyncThunk } from '@reduxjs/toolkit'
import { IAuth } from 'constants/interface/auth.interface'
import db from 'service/db.connect'
import { collection, query, where, limit, getDocs } from 'firebase/firestore'
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

    const isPasswordValid = await bcrypt.compare(matKhau, userData.matKhau)
    if (!isPasswordValid) {
      throw new Error('Mật khẩu không hợp lệ')
    }

    return userData
  } catch (error) {
    console.error(error)
    throw error
  }
})

import { createAsyncThunk } from '@reduxjs/toolkit'
import bcrypt from 'bcryptjs'
import { IAuth } from 'constants/interface/auth.interface'
import db from 'service/db.connect'

interface LoginPayload {
  taiKhoan: string
  matKhau: string
}
export const loginAction = createAsyncThunk('auth/login', async (payload: LoginPayload) => {
  try {
    const { taiKhoan, matKhau } = payload

    // Kiểm tra tài khoản hoặc email
    const usersSnapshot = await db.collection('users').where('taiKhoan', '==', taiKhoan).limit(1).get()

    if (usersSnapshot.empty) {
      throw new Error('Tài khoản không hợp lệ')
    }

    const userDoc = usersSnapshot.docs[0]
    const userData = userDoc.data() as IAuth

    // Kiểm tra mật khẩu chỉ khi tài khoản hợp lệ
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

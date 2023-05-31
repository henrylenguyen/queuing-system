import { createAsyncThunk } from '@reduxjs/toolkit'
import { IAuth, IChangePass } from 'constants/interface/auth.interface'
import db from 'service/db.connect'
import { collection, query, where, limit, getDocs, getDoc, doc, updateDoc } from 'firebase/firestore'
import bcrypt from 'bcryptjs'
interface LoginPayload {
  taiKhoan: string
  matKhau: string
}
// -------------------------------------ĐĂNG NHẬP------------------------------
export const loginAction = createAsyncThunk('auth/login', async (payload: LoginPayload) => {
  try {
    const { taiKhoan, matKhau } = payload

    // kiểm tra tài khoản hợp lệ
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

// -----------------------KIỂM TRA TỒN TẠI CỦA EMAIL---------------------------
export const checkEmailExistence = createAsyncThunk('auth/checkEmail', async (email: string) => {
  try {
    const querySnapshot = await getDocs(query(collection(db, 'users'), where('email', '==', email), limit(1)))

    if (!querySnapshot.empty) {
      // Email tồn tại
      console.log('Đã xác nhận email')
      return true
    }

    // Email không tồn tại
    throw new Error('Email không hợp lệ')
  } catch (error) {
    console.error(error)
    throw error
  }
})
// -------------------------------ĐỔI MẬT KHẨU DỰA VÀO EMAIL-------------------
export const changePasswordAction = createAsyncThunk('auth/changePassword', async (payload: IChangePass) => {
  try {
    const { email, matKhau } = payload
    console.log('file: auth.action.ts:79 ~ matKhau:', matKhau)
    console.log('file: auth.action.ts:79 ~ email:', email)

    // Kiểm tra xem email có tồn tại trong bảng "users" hay không
    const querySnapshot = await getDocs(query(collection(db, 'users'), where('email', '==', email), limit(1)))

    if (!querySnapshot.empty) {
      // Email tồn tại, cập nhật mật khẩu mới
      const userDoc = querySnapshot.docs[0]
      const userId = userDoc.id

      // Hash mật khẩu mới sử dụng bcrypt
      const hashedPassword = await bcrypt.hash(matKhau, 10)

      // Cập nhật mật khẩu mới vào Firestore
      await updateDoc(doc(db, 'users', userId), {
        matKhau: hashedPassword
      })

      return true // Trả về true để biểu thị rằng mật khẩu đã được thay đổi thành công
    }
  } catch (error) {
    console.error(error)
    throw error
  }
})

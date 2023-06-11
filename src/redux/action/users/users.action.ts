import { createAsyncThunk } from '@reduxjs/toolkit'
import { IAuth } from 'constants/interface/auth.interface'
import db from 'service/db.connect'
import { collection, getDocs, DocumentData, addDoc, getDoc, doc } from 'firebase/firestore'
import bcrypt from 'bcryptjs'
import { clearUserDetail } from 'redux/slice/userSlice'

// ------------------------LẤY DANH SÁCH NGƯỜI DÙNG-------------------------
export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  try {
    const userRef = collection(db, 'users')
    const snapshot = await getDocs(userRef)

    const user = snapshot.docs.map((doc) => {
      const userData = doc.data() as { hoTen: string; [key: string]: any }
      const userID = doc.id
      return { id: userID, ...userData }
    })

    // Sắp xếp hoTen từ A-Z
    user.sort((a, b) => a.hoTen.localeCompare(b.hoTen))

    return user
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error)
    throw error
  }
})
// ---------------------------LẤY RA VAI TRÒ NGƯỜI DÙNG------------------------

export const fetchUserRole = createAsyncThunk('user/fetchUserRole', async () => {
  try {
    const userRef = collection(db, 'users')
    const snapshot = await getDocs(userRef)

    const uniqueRoles = new Set<string>()

    const users = snapshot.docs.reduce((result, doc) => {
      const userData = doc.data()
      const userID = doc.id
      const vaiTro = userData.vaiTro

      if (!uniqueRoles.has(vaiTro)) {
        uniqueRoles.add(vaiTro)
        result.push({ id: userID, vaiTro })
      }

      return result
    }, [] as { id: string; vaiTro: string }[])

    return users
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error)
    throw error
  }
})

// ------------THÊM MỚI TÀI KHOẢN---------------

export const addUser = createAsyncThunk('user/addUser', async (newUser: IAuth) => {
  try {
    const userRef = collection(db, 'users')

    // Kiểm tra xem taiKhoan, email, và số điện thoại đã tồn tại trong Firestore chưa
    const querySnapshot = await getDocs(userRef)
    const existingUsers = querySnapshot.docs.map((doc) => doc.data() as IAuth)

    const isExistingTaiKhoan = existingUsers.some((user) => user.taiKhoan === newUser.taiKhoan)
    const isExistingEmail = existingUsers.some((user) => user.email === newUser.email)
    const isExistingSoDienThoai = existingUsers.some((user) => user.soDienThoai === newUser.soDienThoai)

    if (isExistingTaiKhoan) {
      return { success: false, message: 'Tài khoản đã tồn tại' }
    }
    if (isExistingSoDienThoai) {
      return { success: false, message: 'Số điện thoại đã tồn tại' }
    }
    if (isExistingEmail) {
      return { success: false, message: 'Email đã tồn tại' }
    }

    // Mã hóa mật khẩu bằng bcryptjs
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(newUser.matKhau, saltRounds)

    // Thêm tài khoản mới vào Firestore
    await addDoc(userRef, { ...newUser, matKhau: hashedPassword, avatar: '' })
    return { success: true, message: 'Thêm mới tài khoản thành công' }
  } catch (error) {
    console.error('Lỗi khi thêm tài khoản mới:', error)
    throw error
  }
})
// -------------------- LẤY THÔNG TIN USER ---------------------

export const fetchUserDetail = createAsyncThunk('user/fetchUserDetail', async (id: string, { dispatch }) => {
  try {
    dispatch(clearUserDetail())
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
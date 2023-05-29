import { createAsyncThunk } from '@reduxjs/toolkit'
import { IAuth } from 'constants/interface/auth.interface'
import db from 'service/db.connect'
import { collection, getDocs, DocumentData } from 'firebase/firestore'

export const fetchUsers = createAsyncThunk<IAuth[]>('user/fetchUsers', async () => {
  try {
    const usersSnapshot = await getDocs(collection(db, 'users'))
    const users: IAuth[] = []
    usersSnapshot.forEach((doc) => {
      const user = doc.data() as IAuth
      users.push(user)
    })
    return users
  } catch (error) {
    console.error(error)
    throw error
  }
})

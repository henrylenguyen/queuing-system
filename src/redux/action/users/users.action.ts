import { createAsyncThunk } from '@reduxjs/toolkit'
import { IAuth } from 'constants/interface/auth.interface'
import db from 'service/db.connect'

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const usersSnapshot = await db.collection('users').get()
  const users: IAuth[] = []
  usersSnapshot.forEach((doc) => {
    const user = doc.data() as IAuth
    users.push(user)
  })
  return users
})
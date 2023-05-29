import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAuth } from 'constants/interface/auth.interface';
import db from 'service/db.connect';

interface LoginPayload {
  taiKhoan: string;
  matKhau: string;
}

export const loginAction = createAsyncThunk('auth/login', async (payload: LoginPayload) => {
  try {
    const { taiKhoan, matKhau } = payload;

    // Check account or email
    const usersSnapshot = await db.collection('users').where('taiKhoan', '==', taiKhoan).limit(1).get();

    if (usersSnapshot.empty) {
      throw new Error('Tài khoản không hợp lệ');
    }

    const userDoc = usersSnapshot.docs[0];
    const userData = userDoc.data() as IAuth;

    // Check password only if the account is valid
    if (matKhau !== userData.matKhau) {
      throw new Error('Mật khẩu không hợp lệ');
    }

    return userData;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

import { initializeApp } from 'firebase/app'
import { getFirestore } from '@firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'



const firebaseConfig = {
  apiKey: 'AIzaSyCbmsEYU0AsR2-u708wzYweBzA9eZ6tJ4o',
  authDomain: 'queuing-system-47714.firebaseapp.com',
  projectId: 'queuing-system-47714',
  storageBucket: 'queuing-system-47714.appspot.com',
  messagingSenderId: '238363372968',
  appId: '1:238363372968:web:f2abf58fbfc6bdb947819d',
  measurementId: 'G-G82N1D3B1T'
}
// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
export const storage = getStorage(app)
// Kiểm tra kết nối
if (db) {
  console.log('Kết nối thành công đến Firestore')
} else {
  console.log('Kết nối không thành công đến Firestore')
}
export default db

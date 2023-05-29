import { initializeApp } from 'firebase/app'
import { getFirestore } from '@firebase/firestore'
import { getAuth } from 'firebase/auth'
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID
// }

const firebaseConfig = {
  apiKey: 'AIzaSyCQiU7T7pTX5un8s1PkS7FK3SF0YcWz2q0',
  authDomain: 'queuing-system-8258d.firebaseapp.com',
  projectId: 'queuing-system-8258d',
  storageBucket: 'queuing-system-8258d.appspot.com',
  messagingSenderId: '987648151922',
  appId: '1:987648151922:web:afd1ff1c588418d480cdeb',
  measurementId: 'G-M02REBVWHM'
}
// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
// Kiểm tra kết nối
if (db) {
  console.log('Kết nối thành công đến Firestore')
} else {
  console.log('Kết nối không thành công đến Firestore')
}
export default db

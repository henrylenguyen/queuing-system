import admin from 'firebase-admin'
import dotenv from 'dotenv'

dotenv.config()
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID
}
admin.initializeApp(firebaseConfig)
const db = admin.firestore()
export default db

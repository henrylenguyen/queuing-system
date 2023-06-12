import { collection, getDocs } from "@firebase/firestore"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { IDiary } from "constants/interface/diary.interface"
import { format } from "date-fns"
import db from "service/db.connect"

export const fetchDiaries = createAsyncThunk('diary/fetchDiaries', async () => {
  try {
    const diariesRef = collection(db, 'userLogs') 
    const snapshot = await getDocs(diariesRef)
    const diaries = snapshot.docs.map((doc) => {
      const diaryData = doc.data() as any

      let thoiGianThucHienDate: Date | null = null
      if (typeof diaryData.thoiGianThucHien === 'object') {
        thoiGianThucHienDate = new Date(diaryData.thoiGianThucHien.seconds * 1000)
      }

      const formattedThoiGianThucHien = thoiGianThucHienDate ? format(thoiGianThucHienDate, 'dd/MM/yyyy HH:mm:ss') : ''

      const formattedDiaryData: IDiary = {
        tenDangNhap: diaryData.tenDangNhap,
        thoiGianThucHien: formattedThoiGianThucHien,
        IPThucHien: diaryData.IPThucHien,
        thaoTacThucHien: diaryData.thaoTacThucHien
      }

      return formattedDiaryData
    })

    const sortedDiaries = diaries.sort((a, b) => {
      const dateA = new Date(a.thoiGianThucHien)
      const dateB = new Date(b.thoiGianThucHien)
      return dateA.getTime() - dateB.getTime()
    })

    return sortedDiaries
  } catch (error) {
    console.log(error)
    throw error
  }
})

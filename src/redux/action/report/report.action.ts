import { collection, getDocs } from "@firebase/firestore"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { INumber } from "constants/interface/number.interface"
import db from "service/db.connect"
import { format } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'
const countStatus = (numbers: INumber[], status: string): number => {
  return numbers.filter((number) => number.trangThai === status).length
}

export const fetchReport = createAsyncThunk('report/fetchReport', async () => {
  try {
    const numberRef = collection(db, 'numbers')
    const snapshot = await getDocs(numberRef)

  const numbers = snapshot.docs.map((doc) => {
    const numberData = doc.data() as any 
    console.log("file: report.action.ts:18 ~ numberData:", numberData)

    const numberID = doc.id

    let hanSuDungDate: Date | null = null
    if (typeof numberData.hanSuDung === 'object') {
      hanSuDungDate = new Date(numberData.hanSuDung.seconds * 1000)
    }

    let thoiGianCapDate: Date | null = null
    if (typeof numberData.thoiGianCap === 'object') {
      thoiGianCapDate = new Date(numberData.thoiGianCap.seconds * 1000)
    }

    const formattedHanSuDung = hanSuDungDate ? format(hanSuDungDate, 'dd/MM/yyyy HH:mm:ss') : ''
    const formattedThoiGianCap = thoiGianCapDate ? format(thoiGianCapDate, 'dd/MM/yyyy HH:mm:ss') : ''

    const formattedNumberData = {
      ...numberData,
      id: numberID,
      hanSuDung: formattedHanSuDung,
      thoiGianCap: formattedThoiGianCap
    }

    return formattedNumberData
  })

    

    const sortedNumbers = numbers.sort((a, b) => a.STT - b.STT) // Sắp xếp theo trường STT

    const total = [
      { name: 'Số thứ tự đã cấp', amountInMonth: numbers.length, id: uuidv4() },
      { name: 'Số thứ tự bỏ qua', amountInMonth: countStatus(numbers, 'skipped'), id: uuidv4() },
      { name: 'Số thứ tự đã sử dụng', amountInMonth: countStatus(numbers, 'used'), id: uuidv4() },
      { name: 'Số thứ tự đang chờ', amountInMonth: countStatus(numbers, 'pending'), id: uuidv4() }
    ]

    return { sortedNumbers, total }
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error)
    throw error
  }
})



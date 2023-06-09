import { collection, getDocs } from '@firebase/firestore'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { INumber } from 'constants/interface/number.interface'
import db from 'service/db.connect'
import { endOfMonth, format, isWithinInterval, parse, startOfMonth, subMonths } from 'date-fns'
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
        id: doc.id,
        hanSuDung: formattedHanSuDung,
        thoiGianCap: formattedThoiGianCap
      }

      return formattedNumberData
    })

    const sortedNumbers = numbers.sort((a, b) => a.STT - b.STT) // Sắp xếp theo trường STT

    const currentMonthTotal = [
      { name: 'Số thứ tự đã cấp', amountInMonth: numbers.length, id: uuidv4() },
      { name: 'Số thứ tự bỏ qua', amountInMonth: countStatus(numbers, 'skipped'), id: uuidv4() },
      { name: 'Số thứ tự đã sử dụng', amountInMonth: countStatus(numbers, 'used'), id: uuidv4() },
      { name: 'Số thứ tự đang chờ', amountInMonth: countStatus(numbers, 'pending'), id: uuidv4() }
    ]

    const lastMonthStart = startOfMonth(subMonths(new Date(), 1))
    const lastMonthEnd = endOfMonth(subMonths(new Date(), 1))
    const amountLastMonth = numbers.filter((number) => {
      const thoiGianCapDate = parse(number.thoiGianCap, 'dd/MM/yyyy HH:mm:ss', new Date())
      return isWithinInterval(thoiGianCapDate, { start: lastMonthStart, end: lastMonthEnd })
    }).length


    const amountInMonth = numbers.filter((number) => {
      const thoiGianCapDate = parse(number.thoiGianCap, 'dd/MM/yyyy HH:mm:ss', new Date())
      return isWithinInterval(thoiGianCapDate, { start: startOfMonth(new Date()), end: endOfMonth(new Date()) })
    }).length

    let percentage = 0
    if (amountLastMonth !== 0) {
      percentage = ((amountInMonth - amountLastMonth) * 100) / amountLastMonth
    }

    const total = currentMonthTotal.map((item) => {
      let statistical = ''
      if (amountLastMonth === 0) {
        statistical = '0%'
      } else {
        statistical = percentage.toFixed(2) + '%'
      }

      const increase = amountInMonth - amountLastMonth > 0
      const decrease = amountInMonth - amountLastMonth < 0

      return {
        ...item,
        amountLastMonth,
        statistical,
        increase,
        decrease
      }
    })

    return { numbers: sortedNumbers, total }
  } catch (error) {
    console.log(error)
    throw error
  }
})

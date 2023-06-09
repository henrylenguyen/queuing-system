import { INumber } from './number.interface'

export interface IReport {
  total: {
    id: string
    name: string
    amountInMonth: number
    amountLastMonth: number
    statistical: string
    increase: boolean
    decrease: boolean
  }[]
  numbers: INumber[]
}

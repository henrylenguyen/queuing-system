import { INumber } from './number.interface'

export interface IReport {
  total: {
    name: string
    amount: number
  }[]
  sortedNumbers: INumber[]
}

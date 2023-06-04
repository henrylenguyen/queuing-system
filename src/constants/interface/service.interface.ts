export interface IServices {
  id:string
  maDichVu: string
  moTa: string
  quyTacCapSo?: QuyTacCapSo[]
  tenDichVu: string
  trangThaiHoatDong: string
}
export interface QuyTacCapSo {
  name: string
  data: any
}

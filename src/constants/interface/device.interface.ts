export interface Device {
  id: string
  maThietBi: string
  tenThietBi: string
  diaChiIP: string
  trangThaiHoatDong?: string
  trangThaiKetNoi?: string
  dichVuSuDung: string
}
export interface IDeviceManagement extends Device {
  loaiThietBi: {
    value: string
    label: string
  }[]
  taiKhoan: string
  matKhau: string
}

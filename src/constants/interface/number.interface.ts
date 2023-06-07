export interface IAddNumber {
  tenDichVu: string
  nguonCap?: string
  tenKhachHang?: string
  soDienThoai?: string
  email?: string

}
export interface INumber extends IAddNumber {
  id: string
  STT: number
  thoiGianCap: string
  hanSuDung: string
  trangThai: string
}

import * as yup from 'yup'
export const DeviceShema = yup
  .object({
    maThietBi: yup.string().required('Mã thiết bị là bắt buộc'),
    tenThietBi: yup.string().required('Tên thiết bị là bắt buộc'),
    diaChiIP: yup.string().required('Địa chỉ IP là bắt buộc'),
    dichVuSuDung: yup.string().required('Dịch vụ sử dụng là bắt buộc'),
    loaiThietBi: yup.string().required('Loại thiết bị là bắt buộc'),
    taiKhoan: yup.string().required('Tài khoản là bắt buộc'),
    matKhau: yup.string().required('Mật khẩu là bắt buộc'),
  })
  .required()

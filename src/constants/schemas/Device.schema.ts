import * as yup from 'yup'
export const DeviceShema = yup
  .object({
    maThietBi: yup.string().required('Mã thiết bị là bắt buộc'),
    tenThietBi: yup.string().required('Tên thiết bị là bắt buộc'),
    diaChiIP: yup
      .string()
      .required('Địa chỉ IP là bắt buộc')
      .matches(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/, 'Địa chỉ IP không hợp lệ'),
    dichVuSuDung: yup
      .array()
      .transform((value, originalValue) => {
        if (originalValue === '') {
          return []
        }
        return value
      })
      .of(yup.string())
      .required('Vui lòng chọn ít nhất một tùy chọn')
      .min(1, 'Vui lòng chọn ít nhất một tùy chọn'),
    loaiThietBi: yup.string().required('Loại thiết bị là bắt buộc'),
    taiKhoan: yup.string().required('Tài khoản là bắt buộc'),
    matKhau: yup.string().required('Mật khẩu là bắt buộc')
  })
  .required()

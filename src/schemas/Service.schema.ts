import * as yup from 'yup'
export const ServiceShema = yup
  .object({
    maDichVu: yup.string().required('Mã dịch vụ là bắt buộc'),
    tenDichVu: yup.string().required('Tên dịch vụ là bắt buộc'),
    quyTacCapSo: yup
      .array()
      .of(yup.string())
      .min(1, 'Vui lòng chọn ít nhất một tùy chọn')
      .required('Vui lòng chọn ít nhất một tùy chọn'),
    moTa: yup.string()
  })
  .required()

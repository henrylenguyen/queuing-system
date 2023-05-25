import * as yup from 'yup'
export const ServiceShema = yup
  .object({
    maDichVu: yup.string().required('Mã dịch vụ là bắt buộc'),
    tenDichVu: yup.string().required('Tên dịch vụ là bắt buộc'),
    quyTacCapSo: yup.array(),
    moTa: yup.string()
  })
  .required()

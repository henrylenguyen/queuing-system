import * as yup from 'yup'
export const LoginShema = yup
  .object({
    taiKhoan: yup.string().required('Tài khoản là bắt buộc'),
    matKhau: yup.string().required('Mật khẩu là bắt buộc')
  })
  .required()
export const resetSchema = yup
  .object({
    email: yup.string().required('Email là bắt buộc').email('Email phải có định dạng example@abc.com')
  })
  .required()

export const newPassSchema = yup
  .object({
    matKhau: yup
      .string()
      .required('Mật khẩu là bắt buộc')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
        'Mật khẩu phải có ít nhất 1 in hoa, 1 in thường, 1 số và 1 ký tự đặt biệt và từ 6-20 ký tự'
      ),
    nhapLaiMatKhau: yup
      .string()
      .required('Nhập lại mật khẩu là bắt buộc')
      .oneOf([yup.ref('matKhau')], 'Mật khẩu nhập lại không khớp!')
  })
  .required()

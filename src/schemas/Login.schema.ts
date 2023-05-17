import * as yup from 'yup'
export const LoginShema = yup
  .object({
    username: yup.string().required('Tên đăng nhập là bắt buộc'),
    password: yup.string().required('Mật khẩu là bắt buộc')
  })
  .required()
export const resetSchema = yup
  .object({
    email: yup.string().required('Email là bắt buộc').email('Email phải có định dạng example@abc.com')
  })
  .required()

export const newPassSchema = yup
  .object({
    password: yup
      .string()
      .required('Mật khẩu là bắt buộc')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/,
        'Mật khẩu phải có ít nhất 1 in hoa, 1 in thường, 1 số và 1 ký tự đặt biệt và từ 6-10 ký tự'
      ),
    rePassword: yup
      .string()
      .required('Nhập lại mật khẩu là bắt buộc')
      .oneOf([yup.ref('password')], 'Mật khẩu nhập lại không khớp!')
  })
  .required()

import * as yup from 'yup'
const LoginShema = yup
  .object({
    username: yup.string().required('Tên đăng nhập là bắt buộc'),
    password: yup.string().required('Mật khẩu là bắt buộc')
  })
  .required()
export default LoginShema
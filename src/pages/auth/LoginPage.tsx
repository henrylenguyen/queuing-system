import LoginLayout from 'layouts/login/LoginLayout'
import React, { useEffect, useRef } from 'react'
import Form from 'components/form/Form'
import { LoginShema } from 'schemas/Login.schema'
import { loginField } from 'constants/fields/login.fields'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'redux/store'
import { loginAction } from 'redux/action/users/auth.action'
import { message } from 'antd'
import login from 'assets/images/login.png'
import Loading from 'components/loading/Loading'
import { useLocalStorage } from 'usehooks-ts'
type Props = {}

const LoginPage = (props: Props) => {
  const navigate = useNavigate()
  const { user, isLoading, error } = useSelector((state: RootState) => state.auth)
  const [logged, setLogged] = useLocalStorage('islogin', { islogin: false, id: '' })
  const dispatch = useDispatch<AppDispatch>()
  const handleSubmitForm = (data: any) => {
    dispatch(loginAction(data))
  }
  const isShownSuccessMessage = useRef(false) // dùng ref để kiểm tra thông báo
  useEffect(() => {
    if (user && user?.vaiTro.toLowerCase() === 'quản trị' && !isShownSuccessMessage.current) {
      message.success('Đăng nhập thành công', 1).then(() => navigate('/')) // chuyển hướng về trang chủ sau 1 giây
      setLogged({ islogin: true, id: user.id })
      isShownSuccessMessage.current = true // Nếu mà đã show thông báo thì không show nữa
    } else if (user && user?.vaiTro.toLowerCase() !== 'quản trị') {
      message.error('Bạn không đủ quyền để đăng nhập')
    } else {
      if (logged.islogin && !isShownSuccessMessage.current) {
        message.info('Bạn đã đăng nhập, tự động chuyển hướng sau 3s', 3).then(() => navigate('/'))
        isShownSuccessMessage.current = true
      }
    }
  }, [logged, navigate, setLogged, user])

  return (
    <div>
      {error && <>{message.error(error)}</>}
      {isLoading ? (
        <Loading />
      ) : (
        <LoginLayout src={login}>
          <Form
            schema={LoginShema}
            fields={loginField}
            handleSubmitForm={handleSubmitForm}
            gap='30px'
            titleButton='Đăng nhập'
            // dataValidate={data}
          ></Form>
          <NavLink to='/login/reset-password' className='mt-5 font-semibold text-red-500'>
            Quên mật khẩu?
          </NavLink>
        </LoginLayout>
      )}
    </div>
  )
}

export default LoginPage

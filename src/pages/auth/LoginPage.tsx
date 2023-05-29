import LoginLayout from 'layouts/login/LoginLayout'
import React, { useEffect } from 'react'
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
  const [isLogin, setIsLogin] = useLocalStorage('islogin', false)
  const dispatch = useDispatch<AppDispatch>()
  const handleSubmitForm = (data: any) => {
    dispatch(loginAction(data))
  }
  useEffect(() => {
    const handleLoginSuccess = () => {
      if (isLogin && user) {
        message.success('Đăng nhập thành công')
        setTimeout(() => {
          navigate('/') // chuyển hướng về trang chủ sau 1 giây
        }, 1000)
      } else if (isLogin && !user) {
        setIsLogin(false) // Đặt lại isLogin thành false nếu không có user (để tránh hiển thị thông báo khi người dùng tải lại trang)
      } else {
        if (isLogin) {
          message.info('Bạn đã đăng nhập, tự động chuyển hướng sau 3s')
          setTimeout(() => {
            navigate('/') // chuyển hướng về trang chủ sau 3 giây
          }, 3000)
        }
      }
    }

    handleLoginSuccess()
  }, [isLogin, navigate, setIsLogin, user])

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

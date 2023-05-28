import LoginLayout from 'layouts/login/LoginLayout'
import React from 'react'
import Form from 'components/form/Form'
import { LoginShema } from 'schemas/Login.schema'
import { loginField } from 'constants/fields/login.fields'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'redux/store'
import { loginAction } from 'redux/action/users/auth.action'
import login from 'assets/images/login.png';
type Props = {}



const LoginPage = (props: Props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const handleSubmitForm = (data: any) => {
    console.log(data)
    // dispatch(loginAction(data))
    // navigate('/')
  }
  return (
    <div>
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
    </div>
  )
}

export default LoginPage

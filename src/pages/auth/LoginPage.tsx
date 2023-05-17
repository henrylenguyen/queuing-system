import LoginLayout from 'layouts/login/LoginLayout'
import React from 'react'
import Form from 'components/form/Form'
import { LoginShema } from 'schemas/Login.schema'
import { loginField } from 'constants/fields/login.fields'
import login from 'assets/images/login.png'
import { NavLink } from 'react-router-dom'
type Props = {}

const data = {
  username: 'thaile',
  password: '123456'
}
const handleSubmitForm = (data: any) => {
  console.log(data)
}
const LoginPage = (props: Props) => {
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

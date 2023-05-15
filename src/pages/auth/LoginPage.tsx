import LoginLayout from 'layouts/login/LoginLayout'
import React from 'react'
import Form from 'components/form/Form'
import LoginShema from 'schemas/Login.schema'
import { loginField } from 'constants/fields/login.fields'
import login from 'assets/images/login.png'
type Props = {}

const LoginPage = (props: Props) => {
  return (
    <div>
      <LoginLayout src={login}>
        <Form
          schema={LoginShema}
          fields={loginField}
          handleSubmitForm={function (data: any): void {
            throw new Error('Function not implemented.')
          }}
          gap='30px'
          titleButton='Đăng nhập'
        ></Form>
      </LoginLayout>
    </div>
  )
}

export default LoginPage

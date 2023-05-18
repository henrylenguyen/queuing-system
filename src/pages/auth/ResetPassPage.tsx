import LoginLayout from 'layouts/login/LoginLayout'
import React, { useState } from 'react'
import forgot from 'assets/images/forgotPass.svg'
import * as yup from 'yup'
import { newPassSchema, resetSchema } from 'schemas/Login.schema'
import { newPassField, resetPassField } from 'constants/fields/login.fields'
import Form from 'components/form/Form'
import { useNavigate } from 'react-router-dom'
type Props = {}

const ResetPassPage = (props: Props) => {
  const [value, setValue] = useState('')
  const navigate = useNavigate()
  const handleSubmitForm = (data: any) => {
    console.log(data)
    setValue(data)
  }
  const handleResetPass = (data: any) => {
    console.log(data)
    navigate('/login')
  }
  return (
    <div>
      <LoginLayout src={forgot}>
        {value ? (
          <>
            <h2 className='mb-10 text-[20px] font-semibold'>Đặt lại mật khẩu mới</h2>

            <Form
              schema={newPassSchema}
              fields={newPassField}
              handleSubmitForm={handleResetPass}
              gap='30px'
              titleButton='Xác nhận'
              to='/login'
            ></Form>
          </>
        ) : (
          <>
            <h2 className='mb-10 text-[20px] font-semibold'>Đặt lại mật khẩu</h2>

            <Form
              schema={resetSchema}
              fields={resetPassField}
              handleSubmitForm={handleSubmitForm}
              gap='30px'
              titleButton='Tiếp tục'
              to='/login'
              titleButtonCancel='Hủy'
            ></Form>
          </>
        )}
      </LoginLayout>
    </div>
  )
}

export default ResetPassPage

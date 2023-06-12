import { message } from 'antd'
import forgot from 'assets/images/forgotPass.svg'
import Form from 'components/form/Form'
import { newPassField, resetPassField } from 'constants/fields/login.fields'
import { newPassSchema, resetSchema } from 'constants/schemas/Login.schema'
import LoginLayout from 'layouts/login/LoginLayout'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { changePasswordAction, checkEmailExistence } from 'redux/action/users/auth.action'
import { ResetIsChangePass } from 'redux/slice/auth.slice'
import { AppDispatch, RootState } from 'redux/store'
type Props = {}

const ResetPassPage = (props: Props) => {
  const [value, setValue] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [isEmailValidating, setIsEmailValidating] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const { isChangedPass, emailValid, error } = useSelector((state: RootState) => state.auth)

  const isShownSuccessMessage = useRef(false)
  useEffect(() => {
    if (isEmailValidating) {
      messageApi.open({
        type: 'loading',
        content: 'Đang xác nhận email...',
        duration: 1
      })
    }
  }, [isEmailValidating, messageApi])

  // ...

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (emailValid && isEmailValidating && !isShownSuccessMessage.current) {
      clearTimeout(timeoutRef.current!) // Clear the current timeout (if any)
      timeoutRef.current = setTimeout(() => {
        message.success('Đã xác nhận email', 2.5).then(() => {
          setIsValid(true)
          isShownSuccessMessage.current = true
        })
      }, 2000)
    }
    if (isChangedPass) {
      dispatch(ResetIsChangePass())
      message.success('Thay đổi mật khẩu thành công', 2.5).then(() => {
        navigate('/login')
      })
    }

    return () => {
      clearTimeout(timeoutRef.current!) // Clear the timeout when the component unmounts or when useEffect runs next time
    }
  }, [dispatch, emailValid, isChangedPass, isEmailValidating, navigate])

  // -------------------- XÁC NHẬN EMAIL-------------------------------
  const handleSubmitForm = (data: any) => {
    const { email } = data
    setIsEmailValidating(true) // Bật cờ để hiển thị thông báo "Đang xác nhận email"
    dispatch(checkEmailExistence(email))
    setValue(email)
  }
  // --------------------ĐỔI MẬT KHẨU-------------------------------
  const handleResetPass = (data: any) => {
    const { matKhau } = data
    dispatch(changePasswordAction({ matKhau, email: value }))
  }

  return (
    <div>
      {contextHolder}
      {<>{error && message.error(error)}</>}
      <LoginLayout src={forgot}>
        {isValid ? (
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

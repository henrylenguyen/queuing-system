import Form from 'components/form/Form'
import profileFields, { profileFieldsEdit } from 'constants/fields/profile.fields'
import { DynamicObject } from 'constants/interface/formInterface'
import { LoginShema } from 'constants/schemas/Login.schema'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'redux/store'
import ProfileImage from './ProfileImage'
import Loading from 'components/loading/Loading'
import { Switch } from '@mui/material'
import { useCallback, useState, useEffect } from 'react'
import { UsernameShema } from 'constants/schemas/Username.schema'
import { updateUser } from 'redux/action/users/users.action'
import { clearUpdateStatus } from 'redux/slice/userSlice'
import { message } from 'antd'
import { fetchUserLogin } from 'redux/action/users/auth.action'
import { useLocalStorage } from 'usehooks-ts'

type Props = {}

const ProfileLayout = (props: Props) => {
  const { user } = useSelector((state: RootState) => state.auth)
  console.log('file: ProfileLayout.tsx:20 ~ user:', user)
  const [isEdit, setIsEdit] = useState(false)
  const [isRender, setIsRender] = useState(0)
  const dispatch = useDispatch<AppDispatch>()
  const [isLogin] = useLocalStorage('islogin', { islogin: false, id: null })
  const { updateUserSuccess } = useSelector((state: RootState) => state.user)
  const newUserDetail = useCallback(() => {
    return {
      ...user,
      matKhau: '',
      nhapLaiMatKhau: ''
    }
  }, [user])
  // Làm cho component render lại để hiển thị thông báo và  khi cập nhật thành công và fetch dữ liệu đăng nhập 1 lần nữa
  useEffect(() => {
    if (updateUserSuccess.success) {
      message.success(`${updateUserSuccess.message}`, 2)
      if (isLogin?.id) {
        dispatch(fetchUserLogin(isLogin.id))
      }
    } else if (!updateUserSuccess.success && updateUserSuccess.message !== '') {
      message.error(`${updateUserSuccess.message}`, 2)
    }
    
  }, [updateUserSuccess])

  const newuserDetail = newUserDetail()
  const handleSubmit = (data: any) => {
    const { nhapLaiMatKhau, ...newData } = data
    dispatch(updateUser(newData)).then(() => {
      dispatch(clearUpdateStatus())
    })
  }

  const handleCancelForm = () => {
    setIsEdit(!isEdit)
    setIsRender(isRender + 1)
  }

  return (
    <>
      {user?.id ? (
        <div className='h-[650px] w-full rounded-2xl bg-white px-6 py-10'>
          <div className='text-right'>
            <Switch color='warning' checked={isEdit} onChange={() => setIsEdit(!isEdit)} />
            <span className={`font-bold ${isEdit ? 'text-primary' : ''}`}>{isEdit ? 'Sửa' : 'Xem'}</span>
          </div>
          <div className='flex h-full items-center gap-10'>
            <ProfileImage image={user?.avatar} name={user?.hoTen}></ProfileImage>
            <div className='w-full'>
              {isEdit ? (
                <Form
                  key={isRender}
                  schema={UsernameShema}
                  fields={profileFieldsEdit}
                  gap='30px'
                  initialValues={newuserDetail}
                  titleButton='Cập nhật'
                  titleButtonCancel='Hủy bỏ'
                  handleCancelForm={handleCancelForm}
                  handleSubmitForm={handleSubmit}
                />
              ) : (
                <Form schema={UsernameShema} fields={profileFields} gap='30px' initialValues={user} />
              )}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default ProfileLayout

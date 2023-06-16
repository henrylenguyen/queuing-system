import { Modal, message } from 'antd'
import Form from 'components/form/Form'
import { profileFieldsUpload } from 'constants/fields/profile.fields'
import { UploadShema } from 'constants/schemas/Service.schema'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserLogin } from 'redux/action/users/auth.action'
import { uploadAvatar } from 'redux/action/users/users.action'
import { AppDispatch, RootState } from 'redux/store'
import { useLocalStorage } from 'usehooks-ts'

type Props = {
  image?: string
  name?: string
}
interface UploadAvatarParams {
  id: string
  image: File
}

const ProfileImage = ({ image, name }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const { isUploadSuccess } = useSelector((state: RootState) => state.user)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [isLogin] = useLocalStorage('islogin', { islogin: false, id: null })
  const [open, setOpen] = useState(false)
  const [isUploadSuccessChanged, setUploadSuccessChanged] = useState(false)
  // Làm cho component render lại để hiển thị thông báo và  khi cập nhật thành công và fetch dữ liệu đăng nhập 1 lần nữa
  useEffect(() => {
    if (isUploadSuccessChanged) {
      if (isUploadSuccess.success) {
        message.success(`${isUploadSuccess.message}`, 2)
        if (isLogin.id) {
          dispatch(fetchUserLogin(isLogin.id)) // Fetch dữ liệu đăng nhập 1 lần nữa
        }
      } else if (!isUploadSuccess.success && isUploadSuccess.message !== '') {
        message.error(`${isUploadSuccess.message}`, 2)
      }
      setUploadSuccessChanged(false)
    }
  }, [isUploadSuccess, isUploadSuccessChanged])

  const handleUpload = (data: any) => {
    if (data) {
      if (isLogin.id) {
        const params: UploadAvatarParams = { id: isLogin.id, image: data.hinhAnh[0] }
        dispatch(uploadAvatar(params))
        setOpen(false)
        setUpdateSuccess(true)
        setUploadSuccessChanged(true)
      }
    }
  }

  const showModal = () => {
    setOpen(true)
  }
  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <>
      <div className='flex flex-shrink-0 flex-col items-center gap-10'>
        <div className='relative'>
          <img src={image} alt='avatar' className='h-[250px] w-[250px] rounded-full object-cover' />
          <button
            onClick={showModal}
            className='absolute bottom-[2%] right-[10%] flex h-[40px] w-[40px] items-center justify-center
            rounded-full border-2 border-white bg-[#FF7506] text-white'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z'
              />
            </svg>
          </button>
        </div>

        <span className='text-[30px] font-semibold text-[#282739]'>{name}</span>
      </div>
      <Modal open={open} onCancel={handleCancel} className='h-creen w-full' footer={null}>
        <div className='flex flex-col items-center justify-center gap-10'>
          <Form
            schema={UploadShema}
            fields={profileFieldsUpload}
            gap='30px'
            titleButtonCancel='Hủy bỏ'
            titleButton='Cập nhật'
            handleSubmitForm={handleUpload}
            handleCancelForm={handleCancel}
          />
        </div>
      </Modal>
    </>
  )
}

export default ProfileImage

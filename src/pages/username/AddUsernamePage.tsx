import { message } from 'antd'
import Form from 'components/form/Form'
import PageInfor from 'components/pageInfor/PageInfor'
import usernameFields from 'constants/fields/username.field'
import { DeviceShema } from 'constants/schemas/Device.schema'
import { UsernameShema } from 'constants/schemas/Username.schema'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addUser } from 'redux/action/users/users.action'
import { clearStatus } from 'redux/slice/userSlice'
import { AppDispatch, RootState } from 'redux/store'

type Props = {}

const AddUsernamePage = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const { addUserSuccess } = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()
  useEffect(() => {
    if (addUserSuccess.success) {
      message.success(`${addUserSuccess.message}`, 2).then(() => {
        navigate('/account/account-list')
      })
    } else if (!addUserSuccess.success && addUserSuccess.message !== '') {
      message.error(`${addUserSuccess.message}`, 2)
    }
  }, [addUserSuccess])
  const handleSubmit = (data: any) => {
    const { nhapLaiMatKhau, ...newData } = data
    dispatch(addUser(newData)).then(() => {
      dispatch(clearStatus())
    })
  }
  return (
    <div className='pt-10 '>
      <PageInfor />
      <div className='flex h-full px-10 pt-14  max-[1440px]:px-5'>
        <div className=' flex flex-grow flex-col justify-between overflow-hidden'>
          <div className='w-full'>
            <h3 className='text-[25px] font-semibold text-primary min-[1500px]:text-[30px]'>Quản lý thiết bị</h3>
            <div className='my-10 w-full rounded-xl bg-white p-5'>
              <Form
                schema={UsernameShema}
                fields={usernameFields}
                title='Thông tin thiết bị'
                gap='30px'
                titleButtonCancel='Hủy bỏ'
                titleButton='Thêm tài khoản'
                handleSubmitForm={handleSubmit}
                to='/account/account-list'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddUsernamePage

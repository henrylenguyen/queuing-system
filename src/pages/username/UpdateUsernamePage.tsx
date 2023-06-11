import Form from 'components/form/Form'
import PageInfor from 'components/pageInfor/PageInfor'
import usernameFields from 'constants/fields/username.field'
import { DeviceShema } from 'constants/schemas/Device.schema'

type Props = {}
const handleSubmit = (data: any) => {
  console.log(data)
}
const UpdateUsernamePage = (props: Props) => {
  return (
    <div className='pt-10 '>
      <PageInfor />
      <div className='flex h-full px-10 pt-14  max-[1440px]:px-5'>
        <div className=' flex flex-grow flex-col justify-between overflow-hidden'>
          <div className='w-full'>
            <h3 className='text-[25px] font-semibold text-primary min-[1500px]:text-[30px]'>Quản lý thiết bị</h3>
            <div className='my-10 w-full rounded-xl bg-white p-5'>
              <Form
                schema={DeviceShema}
                fields={usernameFields}
                title='Thông tin thiết bị'
                gap='30px'
                titleButtonCancel='Hủy bỏ'
                titleButton='Cập nhật tài khoản'
                handleSubmitForm={handleSubmit}
                to='/setting/account-manegement'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateUsernamePage

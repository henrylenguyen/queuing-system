import Form from 'components/form/Form'
import PageInfor from 'components/pageInfor/PageInfor'
import { deviceField } from 'constants/fields/device.fields'
import { DeviceShema } from 'schemas/Device.schema'
import { AppDispatch } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { postDevices } from 'redux/action/devices/deviceList.action'

type Props = {}

const AddDevicePage = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const handleSubmit = (data: any) => {
    console.log(data)
    dispatch(postDevices(data))
  }
  const initialValue = {
    maThietBi: uuidv4(),
    tenThietBi: '',
    taiKhoan: '',
    diaChiIP: '',
    matKhau: '',
    dichVuSuDung: '',
    loaiThietBi: ''
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
                schema={DeviceShema}
                fields={deviceField}
                title='Thông tin thiết bị'
                gap='30px'
                titleButtonCancel='Hủy bỏ'
                titleButton='Thêm thiết bị'
                handleSubmitForm={handleSubmit}
                to='/device/device-list'
                initialValues={initialValue}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddDevicePage

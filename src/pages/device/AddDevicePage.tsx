import { message } from 'antd'
import Form from 'components/form/Form'
import PageInfor from 'components/pageInfor/PageInfor'
import { IFields } from 'constants/interface/formInterface'
import { DeviceShema } from 'constants/schemas/Device.schema'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { postDevices } from 'redux/action/devices/deviceList.action'
import { fetchServicesName } from 'redux/action/services/serviceList.action'
import { AppDispatch, RootState } from 'redux/store'
import { v4 as uuidv4 } from 'uuid'

type Props = {}

const AddDevicePage = (props: Props) => {
  const { serviceName, services } = useSelector((state: RootState) => state.service)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const handleSubmit = (data: any) => {
    dispatch(postDevices(data)).then(() => {
      message.success('Thêm mới thiết bị thành công', 2).then(() => {
        navigate('/device/device-list')
      })
    })
  }
  // Lấy danh sách tên dịch vụ
  useEffect(() => {
    dispatch(fetchServicesName())
  }, [dispatch])
  const ServiceNameOptions = useCallback(() => {
    const newService = serviceName?.map((service) => {
      return {
        value: service.tenDichVu,
        label: service.tenDichVu
      }
    })

    return newService
  }, [serviceName])

  const serviceNameOptions = ServiceNameOptions()

  const deviceFieldFunc = useCallback(
    (): IFields[] => [
      {
        name: 'maThietBi',
        type: 'text',
        placeholder: 'Nhập mã thiết bị',
        label: 'Mã thiết bị *',
        className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
        classNameDiv: 'col-span-2 w-full h-full',
        readOnly: true
      },
      {
        name: 'loaiThietBi',
        type: 'select',
        options: [
          {
            value: 'Kiosk',
            label: 'Kiosk'
          },
          {
            value: 'Display counter',
            label: 'Display counter'
          }
        ],
        placeholder: 'Chọn loại thiết bị',
        label: 'Loại thiết bị *',
        className: 'bg-white w-full border border-[#D4D4D7] rounded-md ',
        classNameDiv: 'col-span-2 w-full h-full'
      },
      {
        name: 'tenThietBi',
        type: 'text',
        placeholder: 'Nhập tên thiết bị',
        label: 'Tên thiết bị *',
        className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
        classNameDiv: 'col-span-2 w-full h-full'
      },
      {
        name: 'taiKhoan',
        type: 'text',
        placeholder: 'Nhập tài khoản',
        label: 'Tên đăng nhập *',
        className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
        classNameDiv: 'col-span-2 w-full h-full'
      },
      {
        name: 'diaChiIP',
        type: 'text',
        placeholder: 'Nhập địa chỉ IP',
        label: 'Địa chỉ IP *',
        className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
        classNameDiv: 'col-span-2 w-full h-full'
      },
      {
        name: 'matKhau',
        type: 'password',
        placeholder: 'Nhập mật khẩu',
        label: 'Mật khẩu *',
        className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
        classNameDiv: 'col-span-2 w-full h-full'
      },
      {
        name: 'dichVuSuDung',
        type: 'selectmuti',
        options: serviceNameOptions,
        placeholder: 'Nhập dịch vụ sử dụng',
        label: 'Dịch vụ sử dụng *',
        className: 'bg-white w-full border border-[#D4D4D7] py-2 rounded-md ',
        classNameDiv: 'col-span-4 w-full h-full'
      }
    ],
    []
  )

  const deviceField = deviceFieldFunc()
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

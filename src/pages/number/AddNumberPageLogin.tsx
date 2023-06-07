import Form from 'components/form/Form'
import PageInfor from 'components/pageInfor/PageInfor'
import { useNavigate } from 'react-router-dom'
import { NumberShema } from 'schemas/Number.schema'
import { IFields } from 'constants/interface/formInterface'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'redux/store'
import { useCallback, useEffect, useMemo } from 'react'
import { fetchServicesName } from 'redux/action/services/serviceList.action'
import { fetchDevices } from 'redux/action/devices/deviceList.action'
import { onChangeNumberServiceSelected } from 'redux/slice/numberSlice'

type Props = {}
const handleSubmit = (e: any) => {
  console.log(e)
}

const AddNumberPageLogin = (props: Props) => {
  const { serviceName } = useSelector((state: RootState) => state.service)
  const { devices } = useSelector((state: RootState) => state.device)
  console.log("file: AddNumberPageLogin.tsx:21 ~ devices:", devices)
  const { serviceSelectedOfOnchange } = useSelector((state: RootState) => state.number)
  console.log("file: AddNumberPageLogin.tsx:22 ~ serviceSelectedOfOnchange:", serviceSelectedOfOnchange)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchServicesName())
    dispatch(fetchDevices())
  }, [dispatch])

  // Lọc tìm kiếm thiết bị tương ứng với dịch vụ sử dụng
const filteredDevices = useMemo(() => {
  if (!serviceSelectedOfOnchange) {
    return [] // Return an empty array if `serviceSelectedOfOnchange` is empty, undefined, or null
  }

  const selectedService = serviceSelectedOfOnchange.toLowerCase() // Convert `serviceSelectedOfOnchange` to lowercase

  return devices
    .filter((device) => {
      if (
        device.dichVuSuDung &&
        Array.isArray(device.dichVuSuDung) && // Check if `dichVuSuDung` is an array
        device.dichVuSuDung.some((service) => service.toLowerCase() === selectedService)
      ) {
        return device.tenThietBi
      }
    })
    .map((device) => device.tenThietBi)
}, [devices, serviceSelectedOfOnchange])






  const ServiceNameOptions = useCallback(() => {
    const newService = serviceName?.map((service) => {
      return {
        value: service.tenDichVu,
        label: service.tenDichVu
      }
    })

    return newService
  }, [serviceName])

  const DeviceNameOptions = useCallback(() => {
    const newDevice = filteredDevices?.map((service) => {
      return {
        value: service,
        label: service
      }
    })

    return newDevice
  }, [filteredDevices])

  const deviceNameOptions = DeviceNameOptions()
  // Sự kiện thay đổi của dịch vụ sử dụng thì dispatch select đang chọn vào store để so sánh với thiết bị
  const handleChange = (data: any) => {
    dispatch(onChangeNumberServiceSelected(data.value))
  }
  const serviceNameOptions = ServiceNameOptions()
  const DeviceFields = useCallback((): IFields[] => {
    return [
      {
        name: 'tenKhachHang',
        type: 'text',
        placeholder: 'Nhập tên khách hàng',
        label: 'Tên khách hàng *',
        className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
        classNameDiv: 'col-span-2 w-full h-full'
      },
      {
        name: 'soDienThoai',
        type: 'text',
        placeholder: '0789123456',
        label: 'Số điện thoại khách hàng *',
        className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
        classNameDiv: 'col-span-2 w-full h-full'
      },
      {
        name: 'email',
        type: 'email',
        placeholder: 'example@gmail.com',
        label: 'Email khách hàng',
        className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
        classNameDiv: 'col-span-2 w-full h-full'
      },
      {
        name: 'tenDichVu',
        type: 'select',
        options: serviceNameOptions,
        placeholder: 'Chọn tên dịch vụ',
        label: 'Dịch vụ sử dụng *',
        className: 'bg-white w-full border border-[#D4D4D7] rounded-md ',
        classNameDiv: 'col-span-2 w-full h-full',
        onChange: handleChange
      },
      {
        name: 'nguonCap',
        type: 'select',
        options: deviceNameOptions,
        placeholder: 'Chọn loại thiết bị',
        label: 'Nguồn cấp *',
        className: 'bg-white w-full border border-[#D4D4D7] rounded-md ',
        classNameDiv: 'col-span-4 w-full h-full'
      }
    ]
  }, [deviceNameOptions])
  const deviceField = DeviceFields()

  return (
    <div className='pt-10 '>
      <PageInfor />
      <div className='flex h-full px-10 pt-14  max-[1440px]:px-5'>
        <div className=' flex flex-grow flex-col justify-between overflow-hidden'>
          <div className='w-full'>
            <h3 className='text-[25px] font-semibold text-primary min-[1500px]:text-[30px]'>Quản lý cấp số</h3>
            <div className='my-10 flex h-[500px] w-full flex-col items-center rounded-xl bg-white p-5'>
              <h3 className='mb-5 text-[25px]  font-semibold uppercase text-primary min-[1500px]:text-[30px]'>
                Cấp số mới
              </h3>

              <Form
                handleSubmitForm={handleSubmit}
                schema={NumberShema}
                fields={deviceField}
                gap='20px'
                titleButtonCancel='Hủy'
                to='/number/number-list'
                titleButton='In số'
              ></Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddNumberPageLogin

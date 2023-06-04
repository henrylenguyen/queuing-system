import Form from 'components/form/Form'
import PageInfor from 'components/pageInfor/PageInfor'
import { useEffect } from 'react'
import { ServiceShema } from 'schemas/Service.schema'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'redux/store'
import { serviceFields } from 'constants/fields/service.fields'
import { addService } from 'redux/action/services/serviceList.action'
import { v4 as uuidv4 } from 'uuid'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { resetStatus } from 'redux/slice/services.slice'

type Props = {}
interface InputValue {
  name: string
  data: string | string[]
}
const initialValue = {
  maDichVu: uuidv4(),
  moTa: '',
  tenDichVu: '',
  quyTacCapSo: ''
}
const AddServicePage = (props: Props) => {
  const { inputValue, isSuccess, error } = useSelector((state: RootState) => state.service)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  useEffect(() => {
    if (isSuccess) {
      message.success('Thêm mới dịch vụ thành công', 2).then(() => {
        dispatch(resetStatus())
        navigate('/service/service-list')
      })
    } else {
      if (error) {
        message.error(`${error}`, 3)
      }
    }
  }, [dispatch, error, isSuccess, navigate])

  /**
  * 
  * mergeInputValues có chức năng dùng để gôm đối tượng giống nhau về name gôm thành 1 mảng data duy nhất
  * {
    name: "autoIncrement",
    data: "0004",
    },
    {
    name: "autoIncrement",
    data: ["9999", "1234"],
    },  

    => {
      name: "autoIncrement",
      data: ["9999", "1234",'0004'],
    }
  * 
  */
  const mergeInputValues = useCallback((inputValue: InputValue[]): InputValue[] => {
    const mergedValues: InputValue[] = inputValue.reduce((result: InputValue[], currentValue: InputValue) => {
      const existingItem = result.find((item) => item.name === currentValue.name)
      if (existingItem) {
        if (Array.isArray(existingItem.data)) {
          if (Array.isArray(currentValue.data)) {
            existingItem.data.push(...currentValue.data)
          } else {
            existingItem.data.push(currentValue.data)
          }
        } else {
          if (Array.isArray(currentValue.data)) {
            existingItem.data = [existingItem.data, ...currentValue.data]
          } else {
            existingItem.data = [existingItem.data, currentValue.data]
          }
        }
      } else {
        if (Array.isArray(currentValue.data)) {
          result.push({
            name: currentValue.name,
            data: [...currentValue.data]
          })
        } else {
          result.push({
            name: currentValue.name,
            data: [currentValue.data]
          })
        }
      }
      return result
    }, [])

    return mergedValues
  }, [])

  const mergedValues = mergeInputValues(inputValue)

  //---------------Thêm dữ liệu vào firestore----------
  const handleSubmit = (data: any) => {
    dispatch(addService(data))
  }
  return (
    <div className='pt-10 '>
      <PageInfor />
      <div className='flex h-full px-10 pt-14  max-[1440px]:px-5'>
        <div className=' flex flex-grow flex-col justify-between overflow-hidden'>
          <div className='w-full'>
            <h3 className='text-[25px] font-semibold text-primary min-[1500px]:text-[30px]'>Quản lý dịch vụ</h3>
            <div className='my-10 w-full rounded-xl bg-white p-5'>
              <Form
                schema={ServiceShema}
                fields={serviceFields}
                title='Thông tin dịch vụ'
                gap='30px'
                titleButtonCancel='Hủy bỏ'
                titleButton='Thêm dịch vụ'
                handleSubmitForm={handleSubmit}
                to='/device/device-list/'
                initialValues={initialValue}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddServicePage

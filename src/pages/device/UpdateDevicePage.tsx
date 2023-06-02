import Form from 'components/form/Form'
import PageInfor from 'components/pageInfor/PageInfor'
import { deviceField } from 'constants/fields/device.fields'
import { DeviceShema } from 'schemas/Device.schema'
import Loading from 'components/loading/Loading'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchDeviceDetail, updateDevice } from 'redux/action/devices/deviceDetail.action'
import { AppDispatch, RootState } from 'redux/store'
import { IDeviceManagement } from 'constants/interface/device.interface'
import { message } from 'antd'

type Props = {}

const AddDevicePage = (props: Props) => {
  const { deviceDetail } = useSelector((state: RootState) => state.device)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  // dùng useLocation để lấy ra id sau dấu ?
  const location = useLocation().search
  // tách lấy id
  const path = location.split('?')[1]
  useEffect(() => {
    dispatch(fetchDeviceDetail(path))
  }, [dispatch, path])
  const handleSubmit = (data: IDeviceManagement) => {
    dispatch(updateDevice({ id: path, updatedDeviceData: data })).then(() => {
      message.success('Cập nhật thiết bị thành công', 2).then(() => {
        navigate('/device/device-list')
      })
    })
  }
  return (
    <>
      {deviceDetail.id ? (
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
                    initialValues={deviceDetail}
                    title='Thông tin thiết bị'
                    gap='30px'
                    titleButtonCancel='Hủy bỏ'
                    titleButton='Cập nhật'
                    handleSubmitForm={handleSubmit}
                    to={'/device/device-list'}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default AddDevicePage

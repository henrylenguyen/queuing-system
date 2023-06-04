import Form from 'components/form/Form'
import PageInfor from 'components/pageInfor/PageInfor'
import { ServiceShema } from 'schemas/Service.schema'
import { serviceFields } from 'constants/fields/service.fields'
import Loading from 'components/loading/Loading'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { updateDevice } from 'redux/action/devices/deviceDetail.action'
import { AppDispatch, RootState } from 'redux/store'
import { IDeviceManagement } from 'constants/interface/device.interface'
import { message } from 'antd'
import { fetchServiceDetail, updateService } from 'redux/action/services/serviceDetail.action'
import { IServices } from 'constants/interface/service.interface'
type Props = {}

const UpdateServicePage = (props: Props) => {
  const { serviceDetail } = useSelector((state: RootState) => state.service)
  console.log("file: UpdateServicePage.tsx:19 ~ serviceDetail:", serviceDetail)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  // dùng useLocation để lấy ra id sau dấu ?
  const location = useLocation().search
  // tách lấy id
  const path = location.split('?')[1]
  useEffect(() => {
    dispatch(fetchServiceDetail(path))
  }, [dispatch, path])
  const handleSubmit = (data: IServices) => {
    dispatch(updateService({ id: path, updateServiceData: data })).then(() => {
      message.success('Cập nhật dịch vụ thành công', 2).then(() => {
        navigate('/service/service-list')
      })
    })
  }

  return (
    <>
      {serviceDetail.id ? (
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
                    titleButton='Cập nhật'
                    handleSubmitForm={handleSubmit}
                    to='/service/service-list'
                    initialValues={serviceDetail}
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

export default UpdateServicePage

import PageInfor from 'components/pageInfor/PageInfor'
import { useCallback, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'redux/store'
import { fetchServicesName } from 'redux/action/services/serviceList.action'
import { addNumber } from 'redux/action/numbers/numberDetail.action'
import { Modal } from 'antd'
import { IAddNumber } from 'constants/interface/number.interface'
import ModalTicket from 'components/modal/ModalTicket'
import colourStyles from 'utils/customSelect'
type Props = {}

interface IOption {
  value: string
  label: string
}
const AddNumberPage = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState<IOption>({
    value: '',
    label: ''
  })
  const modalContentRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { serviceName } = useSelector((state: RootState) => state.service)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { addNumberDetail } = useSelector((state: RootState) => state.number)
  const dispatch = useDispatch<AppDispatch>()

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

  const handleChange = (data: any) => {
    setSelectedOption(data)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (selectedOption) {
      const numberData: IAddNumber = {
        tenDichVu: selectedOption.value
      }
      dispatch(addNumber(numberData)).then(() => {
        setIsModalOpen(true)
      })
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <div className='pt-10 '>
      <PageInfor />
      <div className='flex h-full px-10 pt-14  max-[1440px]:px-5'>
        <div className=' flex flex-grow flex-col justify-between overflow-hidden'>
          <div className='w-full'>
            <h3 className='text-[25px] font-semibold text-primary min-[1500px]:text-[30px]'>Quản lý cấp số</h3>
            <div className='my-10 flex h-[500px] w-full flex-col items-center rounded-xl bg-white p-5'>
              <h3 className='text-[25px] font-semibold  uppercase text-primary min-[1500px]:text-[30px]'>Cấp số mới</h3>
              <h4 className='mt-5  text-[18px] font-semibold text-[#535261] min-[1500px]:text-[20px]'>
                Dịch vụ khách hàng lựa chọn
              </h4>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className='mt-5 w-[400px]'>
                  <Select
                    styles={colourStyles}
                    options={serviceNameOptions}
                    onChange={handleChange}
                    placeholder='Chọn dịch vụ'
                  />
                </div>
                <div className='col-span-4 mt-10 flex w-full justify-center gap-5'>
                  <button
                    className=' w-[200px] rounded-md border border-primary  p-[10px] text-[18px] font-medium text-primary'
                    onClick={() => navigate('/number/number-list')}
                  >
                    Hủy
                  </button>

                  <button
                    type='submit'
                    className=' w-[200px] rounded-md bg-primary p-[10px] text-[18px] font-medium text-white'
                  >
                    In số
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ModalTicket
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        STT={addNumberDetail.STT}
        tenDichVu={addNumberDetail.tenDichVu}
        thoiGianCap={addNumberDetail.thoiGianCap}
        hanSuDung={addNumberDetail.hanSuDung}
      ></ModalTicket>
    </div>
  )
}

export default AddNumberPage

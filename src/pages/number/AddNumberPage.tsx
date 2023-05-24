import Form from 'components/form/Form'
import PageInfor from 'components/pageInfor/PageInfor'
import { deviceField } from 'constants/fields/device.fields'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { DeviceShema } from 'schemas/Device.schema'
import Select from 'react-select'
type Props = {}
const handleSubmit = (data: any) => {
  console.log(data)
}
const statusOptions = [
  {
    value: 'all',
    label: 'Tất cả'
  },
  {
    value: 'active',
    label: 'Hoạt động'
  },
  {
    value: 'inactive',
    label: 'Ngưng hoạt động'
  }
]
const handleChange = (data:any)=>{
  console.log(data)
}
const AddNumberPage = (props: Props) => {
  const navigate = useNavigate()
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
              <div className='w-[400px] mt-5'>
                <Select options={statusOptions} onChange={handleChange} placeholder='Chọn dịch vụ' />
               </div>
              <div className='col-span-4 mt-10 flex w-full justify-center gap-5'>
                <button
                  className=' w-[200px] rounded-md border border-primary  p-[10px] text-[18px] font-medium text-primary'
                  onClick={() => navigate('/number/number-list/')}
                >
                  Hủy
                </button>

                <button
                  onClick={handleSubmit}
                  className=' w-[200px] rounded-md bg-primary p-[10px] text-[18px] font-medium text-white'
                >
                  In số
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddNumberPage

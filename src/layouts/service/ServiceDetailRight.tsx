import React from 'react'
import { DateRange } from '@mui/x-date-pickers-pro'
import { DatePicker, Space } from 'antd'
import DateRangePicker from 'components/datetime/DateRange'
import Select from 'react-select'
const { RangePicker } = DatePicker
type Props = {}

const ServiceDetailRight = (props: Props) => {
  //---------------------------Tìm kiếm trạng thái hoạt động------------------
  const handleStatusChange = (data: any) => {
    console.log(data)
  }
  //---------------------------Tìm kiếm trạng thái kết nối------------------
  const handleConnectionChange = (dates: any, dateStrings: any) => {
    console.log('Ngày đang chọn:', dateStrings)
  }
  // ---------------------DROPDOWN trạng thái hoạt động--------------------------
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
  return (
    <div className='mt-10 flex h-[500px] flex-grow  rounded-xl bg-white p-5'>
      <div>
        <div className='mt-10 flex gap-5'>
          <div className='flex gap-5'>
            <div className='flex w-[150px] flex-col gap-2'>
              <span className='font-semibold'>Trạng thái</span>
              <Select options={statusOptions} onChange={handleStatusChange} placeholder='Chọn' />
            </div>
            <div className='flex  flex-col gap-2'>
              <span className='font-semibold'>Chọn thời gian</span>
              <div>
                <DateRangePicker
                  handleChange={handleConnectionChange}
                  placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
                  className='h-[38px]'
                />
              </div>
            </div>
          </div>
          <div className='relative flex flex-col gap-2 '>
            <span className='font-semibold'>Từ khoá</span>
            <div className='w-[150px]'>
              <input
                type='text'
                className='w-full rounded-md border border-gray-300 bg-white p-2'
                placeholder='Nhập từ khóa'
              />
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='#FF7506'
                className='absolute right-2 top-1/2 h-6 w-6 cursor-pointer'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceDetailRight

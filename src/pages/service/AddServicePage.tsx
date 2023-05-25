import Form from 'components/form/Form'
import PageInfor from 'components/pageInfor/PageInfor'
import { deviceField } from 'constants/fields/device.fields'
import { IFields } from 'constants/interface/formInterface'
import React, { useState } from 'react'
import { DeviceShema } from 'schemas/Device.schema'
import { ServiceShema } from 'schemas/Service.schema'

type Props = {}
const handleSubmit = (data: any) => {
  console.log(data)
}
const AddServicePage = (props: Props) => {
  const [autoIncrement, setAutoIncrement] = useState([])
  const serviceField: IFields[] = [
    {
      name: 'maDichVu',
      type: 'text',
      placeholder: '201',
      label: 'Mã dịch vụ: *',
      className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
      classNameDiv: 'col-span-2 w-full h-full'
    },
    {
      name: 'moTa',
      type: 'textarea',
      placeholder: 'Mô tả dịch vụ',
      label: 'Mô tả:',
      className: 'bg-white w-full border border-[#D4D4D7] rounded-md ',
      classNameDiv: 'col-span-2 w-full h-full row-span-2'
    },
    {
      name: 'tenDichVu',
      type: 'text',
      placeholder: 'Khám tim mạch',
      label: 'Tên dịch vụ *',
      className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
      classNameDiv: 'col-span-2 w-full h-full'
    },
    {
      name: 'quyTacCapSo',
      type: 'checkbox',
      placeholder: '',
      options: [
        {
          label: 'Tăng tự động từ:',
          value: ['0001', '9999'],
          input: true,
          numberOfInput: 2
        },
        {
          label: 'Prefix',
          value: '0001'
        }
      ],
      label: 'Quy tắc cấp số',
      className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
      classNameDiv: 'col-span-2 w-full h-full'
    }
  ]

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
                fields={serviceField}
                title='Thông tin dịch vụ'
                gap='30px'
                titleButtonCancel='Hủy bỏ'
                titleButton='Thêm dịch vụ'
                handleSubmitForm={handleSubmit}
                to='/device/device-list/'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddServicePage

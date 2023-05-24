import Form from 'components/form/Form'
import PageInfor from 'components/pageInfor/PageInfor'
import { deviceField } from 'constants/fields/device.fields'
import React from 'react'
import { DeviceShema } from 'schemas/Device.schema'

type Props = {}
const data = {
  maThietBi: 'KO_01',
  tenThietBi: 'Kiosk',
  taiKhoan: 'xcvxcvxcv',
  diaChiIP: '192.168.1.1',
  matKhau: 'adsasdasd',
  dichVuSuDung: ['kiosk', 'display'],
  loaiThietBi: 'kiosk'
}
const handleSubmit = (data: any) => {
  console.log(data)
}
const AddDevicePage = (props: Props) => {
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
                initialValues={data}
                title='Thông tin thiết bị'
                gap='30px'
                titleButtonCancel='Hủy bỏ'
                titleButton='Cập nhật'
                handleSubmitForm={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddDevicePage

import React from 'react'

type Props = {}

const ServiceDetailLeft = (props: Props) => {
  const data = {
    maDichVu: '201',
    tenDichVu: 'Khám tim mạch',
    moTa: 'Chuyên các bệnh lý về tim',
    quyTacCapSo: [
      {
        name: 'autoIncrement',
        label: 'Tăng tự động',
        data: ['0001', '9999']
      },
      {
        name: 'prefix',
        label: 'Prefix',
        data: '0001'
      },
      {
        name: 'surfix',
        label: 'Surfix',
        data: '0001'
      },
      {
        name: 'reset',
        label: 'Reset Mỗi ngày',
        data: true
      }
    ]
  }
  return (
    <>
      <div className='mt-10 flex h-[500px]  w-[40%] flex-shrink-0 rounded-xl bg-white p-5'>
        <div>
          <h3 className='text-[20px] font-semibold text-primary min-[1500px]:text-[25px]'>Thông tin dịch vụ</h3>
          <div className='mt-10  flex w-full flex-col gap-5'>
            <div className='grid grid-cols-2'>
              <h4 className='font-bold text-[#282739]'>Mã dịch vụ:</h4>
              <span className='text-[#535261]'>{data.maDichVu}</span>
            </div>
            <div className='grid grid-cols-2'>
              <h4 className='font-bold text-[#282739]'>Tên dịch vụ:</h4>
              <span className='text-[#535261]'>{data.tenDichVu}</span>
            </div>
            <div className='grid grid-cols-2'>
              <h4 className='font-bold text-[#282739]'>Mô tả:</h4>
              <span className='text-[#535261]'>{data.moTa}</span>
            </div>
            <div className='flex flex-col gap-4 '>
              <h4 className='text-[20px] font-semibold text-primary'>Quy tắc cấp số:</h4>
              {data.quyTacCapSo.map((item) => (
                <div className='grid grid-cols-2 items-center'>
                  <h4 className='font-bold text-[#282739]'>{`${item.label}:`}</h4>
                  {item.name === 'reset' ? (
                    <span className='text-[#535261]'>Ví dụ: 201 - 2001</span>
                  ) : item.name === 'autoIncrement' ? (
                    Array.isArray(item.data) ? (
                      <div className='flex gap-5'>
                        {item.data?.map((auto) => (
                          <div className='flex w-[70px] items-center justify-center rounded-md border p-3 text-[#535261]'>
                            {auto}
                          </div>
                        ))}
                      </div>
                    ) : (
                      ''
                    )
                  ) : (
                    <div className='flex w-[70px] items-center justify-center rounded-md border p-3 text-[#535261]'>
                      {item.data}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ServiceDetailLeft

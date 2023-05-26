import PageInfor from 'components/pageInfor/PageInfor'
import ServiceDetailLeft from 'layouts/service/ServiceDetailLeft'
import ServiceDetailRight from 'layouts/service/ServiceDetailRight'

import React from 'react'
import { NavLink } from 'react-router-dom'

type Props = {}

const ServiceDetailPage = (props: Props) => {
  return (
    <div className='pt-10 '>
      <PageInfor />
      <div className='flex h-full pl-10 pt-14  max-[1440px]:pl-5'>
        <div className='w-full  flex-col justify-between overflow-hidden'>
          <h3 className='text-[25px] font-semibold text-primary min-[1500px]:text-[30px]'>Quản lý dịch vụ</h3>
          <div className='flex gap-5'>
            <ServiceDetailLeft />
            <ServiceDetailRight />
          </div>
        </div>
        <div className=' flex-shink-0 flex h-[250px] flex-col items-end gap-5 p-5'>
          <button className='h-[80px] w-[150px] rounded-lg bg-[#FFF2E7] shadow'>
            <NavLink to='/device/device-list/update-device' className={'flex flex-col items-center gap-2 text-primary'}>
              <div className='flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='#fff'
                  className='h-6 w-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z'
                  />
                </svg>
              </div>
              <span>Cập nhật danh sách</span>
            </NavLink>
          </button>
          <button className='h-[80px] w-[150px] rounded-lg bg-[#FFF2E7] shadow'>
            <NavLink to='/service/service-list' className={'flex flex-col items-center gap-2 text-primary'}>
              <div className='flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='#fff'
                  className='h-6 w-6'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3' />
                </svg>
              </div>
              <span>Quay lại</span>
            </NavLink>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServiceDetailPage

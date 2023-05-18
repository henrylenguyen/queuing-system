import PageInfor from 'components/pageInfor/PageInfor'
import React from 'react'

import NumberChart from 'layouts/dashboard/NumberChart'
type Props = {}

const Dashboard = (props: Props) => {
  return (
    <div className='w-full p-10'>
      <PageInfor title='Thông tin cá nhân' />
      <div className='mt-14'>
        <div>
          <h3 className='text-[30px] font-bold text-primary'>Biểu đồ cấp số</h3>
          <div className='mt-5 grid grid-cols-4 gap-5'>
            <NumberChart/>
          
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

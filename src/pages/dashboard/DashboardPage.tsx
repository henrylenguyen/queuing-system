import PageInfor from 'components/pageInfor/PageInfor'
import React from 'react'

import NumberChart from 'layouts/dashboard/NumberChart'
import OverviewDashBoard from 'layouts/dashboard/OverviewDashBoard'
import Calendar from 'components/calendar/Calendar'
import AreaChart from 'components/chart/AreaChart'
type Props = {}
const chart = [
  {
    id: 'abc',
    name: 'Số thứ tự đã cấp',
    amountInMonth: 4221,
    amountLastMonth: 2000,
    statistical: '32.1%',
    increase: true,
    decrease: false
  },
  {
    id: 'abcd',
    name: 'Số thứ tự đã sử dụng',
    amountInMonth: 3721,
    amountLastMonth: 5621,
    statistical: '32.1%',
    increase: false,
    decrease: true
  },
  {
    id: 'abcde',
    name: 'Số thứ tự đang chờ',
    amountInMonth: 468,
    amountLastMonth: 32,
    statistical: '32.1%',
    increase: true,
    decrease: false
  },
  {
    id: 'abcdef',
    name: 'Số thứ tự bỏ qua',
    amountInMonth: 32,
    amountLastMonth: 1000,
    statistical: '32.1%',
    increase: false,
    decrease: true
  }
]
const Dashboard = (props: Props) => {
  
  return (
    <div className=' w-full pt-10'>
      <PageInfor activePage='Dashboard' />
      <div className='flex h-full pl-10 pt-14  max-[1440px]:pl-5'>
        <div className=' flex w-[70%] flex-col justify-between'>
          <div>
            <h3 className='text-[25px] font-semibold text-primary min-[1500px]:text-[30px]'>Biểu đồ cấp số</h3>
            <div className='mt-5 grid grid-cols-4 gap-5 pr-10 max-[1440px]:pr-5'>
              {chart?.map((item) => (
                <NumberChart
                  key={item.id}
                  title={item.name}
                  amountInMonth={item.amountInMonth}
                  statistical={item.statistical}
                  increase={item.increase}
                />
              ))}
            </div>
          </div>
          <AreaChart />
        </div>
        <div className=' flex-shink-0 mt-[-20%] w-[30%]  bg-white '>
          <div className='mt-[70%]  flex flex-col gap-10 px-5'>
            <h3 className='text-[30px] font-semibold text-primary '>Tổng quan</h3>
            <OverviewDashBoard />
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

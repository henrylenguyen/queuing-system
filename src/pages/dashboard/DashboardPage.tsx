import PageInfor from 'components/pageInfor/PageInfor'
import React from 'react'

import NumberChart from 'layouts/dashboard/NumberChart'
import { Progress } from 'antd'
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
  // const handleStatistical = () => {

  // }
  return (
    <div className='h-screen w-full py-10'>
      <PageInfor title='Thông tin cá nhân' />
      <div className='flex h-full pl-10  pt-14'>
        <div className=' w-[70%]'>
          <h3 className='text-[25px] font-semibold text-primary min-[1500px]:text-[30px]'>Biểu đồ cấp số</h3>
          <div className='mt-5 grid grid-cols-4 gap-5 pr-10'>
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
          dfgdgdgfdf
        </div>
        <div className=' flex-shink-0 mt-[-20%] w-[30%]  bg-white '>
          <div className='mt-[70%]  flex flex-col gap-10 px-5'>
            <h3 className='text-[30px] font-semibold text-primary '>Tổng quan</h3>
            <div className='flex justify-between'>
              <div className='flex gap-5'>
                <Progress type='circle' percent={75} />
                <div className='flex flex-col'>
                  <span>4.221</span>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

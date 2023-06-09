import PageInfor from 'components/pageInfor/PageInfor'
import React, { useEffect } from 'react'

import NumberChart from 'layouts/dashboard/NumberChart'
import OverviewDashBoard from 'layouts/dashboard/OverviewDashBoard'
import Calendar from 'components/calendar/Calendar'
import AreaChart from 'components/chart/AreaChart'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'redux/store'
import { fetchReport } from 'redux/action/report/report.action'
type Props = {}

const Dashboard = (props: Props) => {
  const { reports, selectedDateRange, isLoading } = useSelector((state: RootState) => state.report)
  console.log("file: DashboardPage.tsx:15 ~ reports:", reports)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchReport())
  }, [])
  const chart = [
    {
      id: 'abc',
      name: 'Số thứ tự đã cấp',
      amountInMonth: 4000,
      amountLastMonth: 2000,
      statistical: '50%', // tháng cũ là 2000, tháng hiện tại là 4000 nên tăng 50%
      increase: true, // do lấy tháng cũ trừ tháng hiện tại > 0 nên tăng
      decrease: false
    },
    {
      id: 'abcd',
      name: 'Số thứ tự đã sử dụng',
      amountInMonth: 2000,
      amountLastMonth: 4000,
      statistical: '50%', // tháng cũ là 2000, tháng hiện tại là 4000 nên giảm 50%
      increase: false, // do lấy tháng cũ trừ tháng hiện tại < 0 nên giảm
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
  return (
    <div className=' w-full pt-10'>
      <PageInfor />
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

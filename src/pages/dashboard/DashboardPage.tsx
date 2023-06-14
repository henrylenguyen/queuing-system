import PageInfor from 'components/pageInfor/PageInfor'
import { useEffect } from 'react'

import Calendar from 'components/calendar/Calendar'
import AreaChart from 'components/chart/AreaChart'
import Loading from 'components/loading/Loading'
import NumberChart from 'layouts/dashboard/NumberChart'
import OverviewDashBoard from 'layouts/dashboard/OverviewDashBoard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchReport, fetchReportDeviceAndService } from 'redux/action/report/report.action'
import { AppDispatch, RootState } from 'redux/store'
type Props = {}

const Dashboard = (props: Props) => {
  const { reports, isLoading } = useSelector((state: RootState) => state.report)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchReport())
    dispatch(fetchReportDeviceAndService())
  }, [])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='h-full w-full pt-10'>
          <PageInfor />
          <div className='flex h-[calc(100%_-_3rem)] pl-10 pt-14  max-[1440px]:pl-5'>
            <div className=' flex w-[65%] flex-col justify-between'>
              <div>
                <h3 className='text-[25px] font-semibold text-primary min-[1500px]:text-[30px]'>Biểu đồ cấp số</h3>
                <div className='mt-5 grid grid-cols-4 gap-5 pr-10 max-[1440px]:pr-5'>
                  {reports?.total?.map((item) => (
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
            <div className=' flex-shink-0 mt-[-20%] w-[35%]  bg-white '>
              <div className='mt-[70%]  flex flex-col gap-10 px-5'>
                <h3 className='text-[30px] font-semibold text-primary '>Tổng quan</h3>
                <OverviewDashBoard />
                <Calendar />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Dashboard

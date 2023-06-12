import DateRangePicker from 'components/datetime/DateRange'
import ExportToExcel from 'components/excel/ExportToExcel'
import Loading from 'components/loading/Loading'
import PageInfor from 'components/pageInfor/PageInfor'
import CustomTable from 'components/table/CustomTable'
import { INumber } from 'constants/interface/number.interface'
import dayjs from 'dayjs'
import moment from 'moment'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchReport } from 'redux/action/report/report.action'
import { onChangeNumberDatePickerReport } from 'redux/slice/report.slice'
import { AppDispatch, RootState } from 'redux/store'
import removeVietnameseTones from 'utils/convertVietnamese'
import getColumnDeviceConfig from 'utils/dataColumn'
// import
type Props = {}

// ---------------------DROPDOWN trạng thái hoạt động--------------------------

const ReportPage = (props: Props) => {
  const { reports, selectedDateRange, isLoading } = useSelector((state: RootState) => state.report)
  const [renderCount, setRenderCount] = useState(0) // để gán vào key của table
  const dispatch = useDispatch<AppDispatch>()
  const [filteredDataReport, setFilteredDataReport] = useState<INumber[]>(reports.numbers)
  //-------------------------GỌI DỮ LIỆU TỪ FIRESTORE-----------------------
  useEffect(() => {
    dispatch(fetchReport())
  }, [])

  // --------------------------Lọc tìm kiếm----------------------

  const FilterReport = useMemo(() => {
    let filterReport = reports.numbers

    if (selectedDateRange?.length === 2 && selectedDateRange[0] !== '' && selectedDateRange[1] !== '') {
      const startDate = moment(selectedDateRange[0], 'DD/MM/YYYY HH:mm:ss')
      const endDate = moment(selectedDateRange[1], 'DD/MM/YYYY HH:mm:ss')

      filterReport = filterReport.filter((reports) => {
        const thoiGianCap = moment(reports.thoiGianCap, 'DD/MM/YYYY HH:mm:ss')
        const hanSuDung = moment(reports.hanSuDung, 'DD/MM/YYYY HH:mm:ss')

        return (
          thoiGianCap.isBetween(startDate, endDate, undefined, '[]') &&
          hanSuDung.isBetween(startDate, endDate, undefined, '[]')
        )
      })
    }

    return filterReport
  }, [reports, selectedDateRange])

  // ---------------TĂNG ĐẾM ĐỂ GÁN VÀO KEY VÀ GÁN LẠI GIÁ TRỊ-----------------
  useEffect(() => {
    setFilteredDataReport(FilterReport) // Cập nhật state khi danh sách thiết bị thay đổi
    setRenderCount((prevCount) => prevCount + 1)
  }, [FilterReport])

  //------------------------------SỬ LÝ BẢNG----------------------------------
  // 1. Lấy ra tất cả các key của object
  const getKeys = useCallback(() => {
    if (reports && reports?.numbers?.length > 0) {
      return Object.keys(reports?.numbers[0])
    } else {
      return []
    }
  }, [reports])

  /* 2. Từ những key của object biến nó thành 1 mảng các đối tượng 
  
*/
  const getDataIndexKey = useCallback(() => {
    const keys = getKeys()

    return keys?.map((item) => {
      return {
        dataIndex: item,
        key: item
      }
    })
  }, [getKeys])
  const dataIndexKey = getDataIndexKey()

  // 3. Tạo ra mảng title chứa các đối tượng title khác nhau, do mình nhập
  const dataTitle = ['STT', 'Tên dịch vụ', 'Thời gian cấp', 'Trạng thái', 'Nguồn cấp']

  const columns = dataTitle.map((title) => {
    // biến chữ tiếng việt có dấu thành không dấu
    const removeTone = removeVietnameseTones(title)
    /* Loại bỏ hết các khoảng trống ở giữa và biến thành in thường
   ví dụ: Mã lịch chiếu ->malichchieu
  */
    const newTitle = removeTone.replace(/\s+/g, '').toLowerCase()
    // dùng hàm find để tìm từ mảng các đối tượng dataIndexKey, so sánh giữa key với newTitle phía trên. Lưu ý là phải chuyển về in thường để so sánh
    const dataIndexKeyItem = dataIndexKey.find((item) => item?.key.toLowerCase() === newTitle)

    // trả về mảng các đối tượng
    return getColumnDeviceConfig(title, dataIndexKeyItem, newTitle)
  })

  const handleTimePickerChange = useCallback(
    (data: any) => {
      const formattedDates = data?.map((date: Date) => dayjs(date).format('DD/MM/YYYY HH:mm:ss'))
      dispatch(onChangeNumberDatePickerReport(formattedDates))
    },
    [dispatch]
  )

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='pt-10 '>
          <PageInfor />
          <div className='flex h-full pl-10 pt-14  max-[1440px]:pl-5'>
            <div className=' flex   flex-col justify-between overflow-hidden'>
              <div>
                <div className='mt-10 flex justify-between gap-5'>
                  <div className='flex justify-between gap-5'>
                    <div className='flex  flex-col gap-2'>
                      <span className='font-semibold'>Chọn thời gian</span>
                      <div>
                        <DateRangePicker
                          handleChange={handleTimePickerChange}
                          placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
                          className='h-[38px]'
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {reports.numbers.length > 0 ? (
                  <CustomTable key={renderCount} data={filteredDataReport} columns={columns} Key={'STT'}></CustomTable>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className=' flex-shink-0 flex h-[350px] flex-col items-end gap-5 p-5'>
              <ExportToExcel
                title={`Báo cáo hệ thống cấp số ngày: ${new Date().toLocaleString()}`}
                columns={columns}
                filteredData={filteredDataReport}
                fileName={`queusing-system ${new Date().toLocaleString()}.xlsx`}
                className={
                  'flex h-[100px] w-[100px] cursor-pointer flex-col items-center gap-2 rounded-lg bg-[#FFF2E7] p-5 text-primary shadow'
                }
                buttonLabel='Tải về'
              >
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
                      d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3'
                    />
                  </svg>
                </div>
              </ExportToExcel>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ReportPage

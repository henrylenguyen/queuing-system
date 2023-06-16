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
import Select from 'react-select'
import colourStyles from 'utils/customSelect'
import { onChangeNumberDatePickerService, onChangeNumberOfSevicesStatus } from 'redux/slice/services.slice'
// import
type Props = {}
const statusOptions = [
  {
    value: 'all',
    label: 'Tất cả'
  },
  {
    value: 'pending',
    label: 'Đang chờ'
  },
  {
    value: 'used',
    label: 'Đã sử dụng'
  },
  {
    value: 'skipped',
    label: 'Bỏ qua'
  }
]
// ---------------------DROPDOWN trạng thái hoạt động--------------------------

const ServiceDetailPage = (props: Props) => {
  const { reports, isLoading } = useSelector((state: RootState) => state.report)
  console.log("file: ServiceDetailRight.tsx:43 ~ reports:", reports)
  const { selectedDateRange, selectedNumberStatus } = useSelector((state: RootState) => state.service)
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

    if (selectedNumberStatus !== 'all') {
      filterReport = filterReport.filter((number) => number.trangThai === selectedNumberStatus)
    }
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
  }, [reports, selectedDateRange, selectedNumberStatus])

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
  const dataTitle = ['STT', 'Trạng thái']

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
      dispatch(onChangeNumberDatePickerService(formattedDates))
    },
    [dispatch]
  )
  //---------------------------Tìm kiếm trạng thái hoạt động------------------
  const handleStatusChange = useCallback(
    (data: any) => {
      dispatch(onChangeNumberOfSevicesStatus(data.value))
    },
    [dispatch]
  )
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='col-span-2 mt-10 rounded-xl  bg-white px-5'>
          <div>
            <div className='mt-10 flex justify-between gap-5'>
              <div className='flex w-full justify-between gap-5'>
                <div className='flex  w-[200px] flex-col gap-2'>
                  <span className='font-semibold'>Tình trạng cấp số</span>
                  <Select
                    options={statusOptions}
                    styles={colourStyles}
                    onChange={handleStatusChange}
                    placeholder='Tình trạng'
                  />
                </div>
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
      )}
    </>
  )
}

export default ServiceDetailPage

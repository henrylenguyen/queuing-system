import { useCallback, useEffect, useMemo, useState } from 'react'
import removeVietnameseTones from 'utils/convertVietnamese'
import CustomTable from 'components/table/CustomTable'
import getColumnDeviceConfig from 'utils/dataColumn'
import PageInfor from 'components/pageInfor/PageInfor'
import { NavLink } from 'react-router-dom'
import DateRangePicker from 'components/datetime/DateRange'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'redux/store'
import {
  fetchDeviceNameOfNumber,
  fetchNumbers,
  fetchServicesNameOfNumber
} from 'redux/action/numbers/numberList.action'
import { INumber } from 'constants/interface/number.interface'
import { onChangeNumberDatePicker } from 'redux/slice/numberSlice'
import moment from 'moment'
import dayjs from 'dayjs'
import { saveAs } from 'file-saver'
type Props = {}

// ---------------------DROPDOWN trạng thái hoạt động--------------------------


//Omit trong ts có nghĩa là loại bỏ 1 trường dữ liệu
type TransformedData = Omit<INumber, 'id'> & { trangThai: string }


const ReportPage = (props: Props) => {
  const { numbers, selectedDateRange } = useSelector((state: RootState) => state.number)
  console.log('file: ReportPage.tsx:31 ~ numbers:', numbers)
  const [renderCount, setRenderCount] = useState(0) // để gán vào key của table
  const dispatch = useDispatch<AppDispatch>()
  const [filteredData, setFilteredData] = useState<INumber[]>(numbers)
  //-------------------------GỌI DỮ LIỆU TỪ FIRESTORE-----------------------
  useEffect(() => {
    dispatch(fetchNumbers())
    dispatch(fetchServicesNameOfNumber())
    dispatch(fetchDeviceNameOfNumber())
  }, [])

  // --------------------------Lọc tìm kiếm----------------------

  const filteredDevices = useMemo(() => {
    let filteredDevices = numbers

    if (selectedDateRange?.length === 2 && selectedDateRange[0] !== '' && selectedDateRange[1] !== '') {
      const startDate = moment(selectedDateRange[0], 'DD/MM/YYYY HH:mm:ss')
      const endDate = moment(selectedDateRange[1], 'DD/MM/YYYY HH:mm:ss')

      filteredDevices = filteredDevices.filter((number) => {
        const thoiGianCap = moment(number.thoiGianCap, 'DD/MM/YYYY HH:mm:ss')
        const hanSuDung = moment(number.hanSuDung, 'DD/MM/YYYY HH:mm:ss')

        return (
          thoiGianCap.isBetween(startDate, endDate, undefined, '[]') &&
          hanSuDung.isBetween(startDate, endDate, undefined, '[]')
        )
      })
    }

    return filteredDevices
  }, [numbers])

  // ---------------TĂNG ĐẾM ĐỂ GÁN VÀO KEY VÀ GÁN LẠI GIÁ TRỊ-----------------
  useEffect(() => {
    setFilteredData(filteredDevices) // Cập nhật state khi danh sách thiết bị thay đổi
    setRenderCount((prevCount) => prevCount + 1)
  }, [filteredDevices])

  //------------------------------SỬ LÝ BẢNG----------------------------------
  // 1. Lấy ra tất cả các key của object
  const getKeys = useCallback(() => {
    if (numbers && numbers.length > 0) {
      return Object.keys(numbers[0])
    } else {
      return []
    }
  }, [numbers])

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
      dispatch(onChangeNumberDatePicker(formattedDates))
    },
    [dispatch]
  )
  const exportExcel = (): void => {}


  return (
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
            {numbers.length > 0 ? (
              <CustomTable key={renderCount} data={filteredData} columns={columns} Key={'STT'}></CustomTable>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className=' flex-shink-0 flex h-[350px] flex-col items-end gap-5 p-5'>
          <div
            onClick={exportExcel}
            className={
              'flex h-[100px] w-[100px] flex-col items-center gap-2 rounded-lg bg-[#FFF2E7] p-5 text-primary shadow'
            }
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
            <span className='text-center'>Tải về</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportPage

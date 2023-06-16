import DateRangePicker from 'components/datetime/DateRange'
import PageInfor from 'components/pageInfor/PageInfor'
import CustomTable from 'components/table/CustomTable'
import { INumber } from 'constants/interface/number.interface'
import dayjs from 'dayjs'
import { useSearch } from 'hooks/useSearch'
import moment from 'moment'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Select from 'react-select'
import {
  fetchDeviceNameOfNumber,
  fetchNumbers,
  fetchServicesNameOfNumber
} from 'redux/action/numbers/numberList.action'
import {
  onChangeNumberDatePicker,
  onChangeNumberDevices,
  onChangeNumberServices,
  onChangeNumberStatus
} from 'redux/slice/number.slice'
import { AppDispatch, RootState } from 'redux/store'
import removeVietnameseTones from 'utils/convertVietnamese'
import colourStyles from 'utils/customSelect'
import getColumnDeviceConfig from 'utils/dataColumn'
type Props = {}

// ---------------------DROPDOWN trạng thái hoạt động--------------------------
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

const NumberListPage = (props: Props) => {
  const {
    numbers,
    selectedStatus,
    selectedServices,
    serviceOfNumbers,
    deviceOfNumbers,
    selectedDevice,
    selectedDateRange
  } = useSelector((state: RootState) => state.number)
  const [renderCount, setRenderCount] = useState(0) // để gán vào key của table
  const dispatch = useDispatch<AppDispatch>()
  const [filteredData, setFilteredData] = useState<INumber[]>(numbers)
  const [debouncedInput, handleSearch] = useSearch('', 500)

  //-------------------------GỌI DỮ LIỆU TỪ FIRESTORE-----------------------
  useEffect(() => {
    dispatch(fetchNumbers())
    dispatch(fetchServicesNameOfNumber())
    dispatch(fetchDeviceNameOfNumber())
  }, [])
  // --------CHUYỂN MẢNG ĐỐI TƯỢNG SERVICENAME THÀNH VALUE LABEL CỦA OPTIONS----

  const ServiceNameOptions = useCallback(() => {
    const newService = serviceOfNumbers?.map((service) => {
      return {
        value: service.tenDichVu,
        label: service.tenDichVu
      }
    })
    const newServiceOptions = [
      {
        label: 'Tất cả',
        value: 'all'
      },
      ...newService
    ]
    return newServiceOptions
  }, [serviceOfNumbers])

  const serviceNameOptions = ServiceNameOptions()
  // ------------------------------LẤY RA TÊN NGUỒN CẤP TẠO THÀNH OPTIONS ---
  const DeviceNameOptions = useCallback(() => {
    const newdevice = deviceOfNumbers?.map((device) => {
      return {
        value: device.tenNguonCap,
        label: device.tenNguonCap
      }
    })
    const newdeviceOptions = [
      {
        label: 'Tất cả',
        value: 'all'
      },
      ...newdevice
    ]
    return newdeviceOptions
  }, [deviceOfNumbers])

  const deviceNameOptions = DeviceNameOptions()

  // --------------------------Lọc tìm kiếm----------------------

  const filteredDevices = useMemo(() => {
    let filteredDevices = numbers

    if (selectedStatus !== 'all') {
      filteredDevices = filteredDevices.filter((number) => number.trangThai === selectedStatus)
    }
    if (selectedServices !== 'all') {
      filteredDevices = filteredDevices.filter((number) => number.tenDichVu === selectedServices)
    }
    if (selectedDevice !== 'all') {
      filteredDevices = filteredDevices.filter((number) => number.nguonCap === selectedDevice)
    }

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
    filteredDevices = filteredDevices.filter((number) =>
      number?.tenKhachHang?.toLowerCase().includes(debouncedInput.toLowerCase())
    )

    return filteredDevices
  }, [numbers, selectedServices, selectedStatus, selectedDevice, selectedDateRange, debouncedInput])

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
  const dataTitle = [
    'STT',
    'Tên khách hàng',
    'Tên dịch vụ',
    'Thời gian cấp',
    'Hạn sử dụng',
    'Trạng thái',
    'Nguồn cấp',
    'Chi tiết'
  ]

  /**
 * 4. Từ mảng đối tượng (3) kết hợp với mảng các đối tượng (4) thành
 *  
 * const columns = [
 * {
 *   title: "Mã lịch chiếu",
 *   dataIndex: "maLichChieu",
     key: "maLichChieu"  
 * }
 * ]
 */
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
  //---------------------------Tìm kiếm trạng thái hoạt động------------------
  const handleServiceChange = useCallback(
    (data: any) => {
      dispatch(onChangeNumberServices(data.value))
    },
    [dispatch]
  )
  //---------------------------Tìm kiếm trạng thái hoạt động------------------
  const handleStatusChange = useCallback(
    (data: any) => {
      dispatch(onChangeNumberStatus(data.value))
    },
    [dispatch]
  )
  //---------------------------Tìm kiếm Nguồn cấp------------------
  const handleDeviceChange = useCallback(
    (data: any) => {
      dispatch(onChangeNumberDevices(data.value))
    },
    [dispatch]
  )
  const handleTimePickerChange = useCallback(
    (data: any) => {
      const formattedDates = data?.map((date: Date) => dayjs(date).format('DD/MM/YYYY HH:mm:ss'))
      dispatch(onChangeNumberDatePicker(formattedDates))
    },
    [dispatch]
  )

  return (
    <div className='pt-10 '>
      <PageInfor />
      <div className='flex h-full pl-10 pt-14  max-[1440px]:pl-5'>
        <div className=' flex   flex-col justify-between overflow-hidden'>
          <div>
            <h3 className='text-[25px] font-semibold text-primary min-[1500px]:text-[30px]'>Quản lý cấp số</h3>
            <div className='mt-10 flex justify-between gap-5'>
              <div className='flex justify-between gap-5'>
                <div className='flex  flex-col gap-2'>
                  <span className='font-semibold'>Tên dịch vụ</span>
                  <Select
                    styles={colourStyles}
                    options={serviceNameOptions}
                    onChange={handleServiceChange}
                    placeholder='Dịch vụ'
                  />
                </div>
                <div className='flex  flex-col gap-2'>
                  <span className='font-semibold'>Tình trạng</span>
                  <Select
                    options={statusOptions}
                    styles={colourStyles}
                    onChange={handleStatusChange}
                    placeholder='Tình trạng'
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <span className='font-semibold'>Nguồn cấp</span>
                  <Select
                    styles={colourStyles}
                    options={deviceNameOptions}
                    onChange={handleDeviceChange}
                    placeholder='Nguồn cấp'
                  />
                </div>
                <div className='flex  flex-col gap-2'>
                  <span className='font-semibold'>Chọn thời gian</span>
                  <div>
                    <DateRangePicker
                      handleChange={handleTimePickerChange}
                      placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
                      className=' h-[38px]'
                    />
                  </div>
                </div>
              </div>
              <div className='relative flex flex-col gap-2 '>
                <span className='font-semibold'>Từ khoá</span>
                <div className='w-[200px]'>
                  <input
                    type='text'
                    className='w-full rounded-md border border-gray-300 bg-white p-2'
                    placeholder='Tìm tên khách hàng'
                    onChange={handleSearch}
                  />
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='#FF7506'
                    className='absolute right-2 top-1/2 h-6 w-6 cursor-pointer'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                    />
                  </svg>
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
          <NavLink
            to='/number/number-list/add-new-number'
            className={
              'flex h-[120px] w-[120px] flex-col items-center gap-2 rounded-lg bg-[#FFF2E7] p-5 text-primary shadow'
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
                  d='M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z'
                />
              </svg>
            </div>
            <span className='text-center'>Cấp số có thông tin</span>
          </NavLink>
          <NavLink
            to='/number/number-list/add-new-number-without-infor'
            className={
              'flex h-[120px] w-[120px] flex-col items-center gap-2 rounded-lg bg-[#FFF2E7] p-5 text-primary shadow'
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
                <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v12m6-6H6' />
              </svg>
            </div>
            <span className='text-center'>Cấp số không thông tin</span>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default NumberListPage

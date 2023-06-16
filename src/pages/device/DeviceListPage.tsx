import Loading from 'components/loading/Loading'
import PageInfor from 'components/pageInfor/PageInfor'
import CustomTable from 'components/table/CustomTable'
import { IDeviceManagement } from 'constants/interface/device.interface'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Select from 'react-select'
import { fetchDevices } from 'redux/action/devices/deviceList.action'
import { onChangeConnection, onChangeStatus } from 'redux/slice/devices.slice'
import { AppDispatch, RootState } from 'redux/store'
import removeVietnameseTones from 'utils/convertVietnamese'
import colourStyles from 'utils/customSelect'
import getColumnDeviceConfig from 'utils/dataColumn'
import { useSearch } from 'hooks/useSearch'

type Props = {}

// ---------------------DROPDOWN trạng thái hoạt động--------------------------
const statusOptions = [
  {
    value: 'all',
    label: 'Tất cả'
  },
  {
    value: true,
    label: 'Hoạt động'
  },
  {
    value: false,
    label: 'Ngưng hoạt động'
  }
]
// ---------------------DROPDOWN trạng thái kết nối--------------------------
const connectionOptions = [
  {
    value: 'all',
    label: 'Tất cả'
  },
  {
    value: true,
    label: 'Kết nối'
  },
  {
    value: false,
    label: 'Mất kết nối'
  }
]
const DeviceListPage = React.memo((props: Props) => {
  const { devices, isLoading, error, selectedStatus, selectedConnection } = useSelector(
    (state: RootState) => state.device
  )
  const dispatch = useDispatch<AppDispatch>()
  const [filteredData, setFilteredData] = useState<IDeviceManagement[]>(devices)
  const [renderCount, setRenderCount] = useState(0)
  const MemoizedCustomTable = React.memo(CustomTable)
  const [debouncedInput, handleSearch] = useSearch('', 500)
  const filteredDevices = useMemo(() => {
    let filteredDevices = devices

    if (selectedStatus !== 'all') {
      filteredDevices = filteredDevices.filter((device) => device.trangThaiHoatDong === selectedStatus)
    }

    if (selectedConnection !== 'all') {
      filteredDevices = filteredDevices.filter((device) => device.trangThaiKetNoi === selectedConnection)
    }
    filteredDevices = filteredDevices.filter((device) =>
      device.tenThietBi.toLowerCase().includes(debouncedInput.toLowerCase())
    )

    return filteredDevices
  }, [devices, selectedStatus, selectedConnection, debouncedInput])
  // ----------- GỌI DANH SÁCH THIẾT BỊ TỪ FIRESTORE--------------------
  useEffect(() => {
    dispatch(fetchDevices())
  }, [dispatch])
  // ---------------TĂNG ĐẾM ĐỂ GÁN VÀO KEY VÀ GÁN LẠI GIÁ TRỊ-----------------
  useEffect(() => {
    setFilteredData(filteredDevices) // Cập nhật state khi danh sách thiết bị thay đổi
    setRenderCount((prevCount) => prevCount + 1)
  }, [filteredDevices])
  // 1. Lấy ra tất cả các key của object
  const getKeys = useCallback(() => {
    if (devices && devices.length > 0) {
      return Object.keys(devices[0])
    } else {
      return []
    }
  }, [devices])

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
    'Mã thiết bị',
    'Tên thiết bị',
    'Địa chỉ IP',
    'Trạng thái hoạt động',
    'Trạng thái kết nối',
    'Dịch vụ sử dụng',
    'Chi tiết',
    'Tùy chỉnh'
  ]

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
  const handleStatusChange = useCallback(
    (data: any) => {
      dispatch(onChangeStatus(data.value))
    },
    [dispatch]
  )

  const handleConnectionChange = useCallback(
    (data: any) => {
      console.log(data)
      dispatch(onChangeConnection(data.value))
    },
    [dispatch]
  )

  // ----------------------------Tìm kiếm ----------------


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
                <h3 className='text-[25px] font-semibold text-primary min-[1500px]:text-[30px]'>Danh sách thiết bị</h3>
                <div className='mt-10 flex justify-between'>
                  <div className='flex gap-5'>
                    <div className='flex w-[300px] flex-col gap-2'>
                      <span className='font-semibold'>Trạng thái hoạt động</span>
                      <Select
                        styles={colourStyles}
                        options={statusOptions}
                        onChange={handleStatusChange}
                        placeholder='Chọn trạng thái'
                      />
                    </div>
                    <div className='flex w-[300px] flex-col gap-2'>
                      <span className='font-semibold'>Trạng thái kết nối</span>
                      <Select
                        styles={colourStyles}
                        options={connectionOptions}
                        onChange={handleConnectionChange}
                        placeholder='Chọn trạng thái'
                      />
                    </div>
                  </div>
                  <div className='relative flex flex-col gap-2 '>
                    <span className='font-semibold'>Từ khoá</span>
                    <div className='w-[300px]'>
                      <input
                        type='text'
                        className='w-full rounded-md border border-gray-300 bg-white p-2'
                        placeholder='Tìm kiếm theo tên thiết bị'
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
                {devices.length > 0 ? (
                  <MemoizedCustomTable
                    key={renderCount}
                    data={filteredData}
                    columns={columns}
                    Key={'maThietBi'}
                  ></MemoizedCustomTable>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className=' flex-shink-0 flex h-[250px] items-end p-5'>
              <NavLink
                to='/device/device-list/add-new-device'
                className={'flex flex-col  items-center gap-2 rounded-lg bg-[#FFF2E7] px-5 py-2 text-primary shadow'}
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
                <span className='text-center'>Thêm thiết bị</span>
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  )
})

export default DeviceListPage

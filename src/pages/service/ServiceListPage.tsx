import { useCallback, useEffect, useMemo, useState } from 'react'
import removeVietnameseTones from 'utils/convertVietnamese'
import CustomTable from 'components/table/CustomTable'
import getColumnDeviceConfig from 'utils/dataColumn'
import PageInfor from 'components/pageInfor/PageInfor'
import { NavLink } from 'react-router-dom'
import Select from 'react-select'
import { DatePicker } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'redux/store'
import { fetchServices } from 'redux/action/services/serviceList.action'
import { IServices } from 'constants/interface/service.interface'
import { onChangeServiceStatus } from 'redux/slice/services.slice'
import colourStyles from 'utils/customSelect'

const { RangePicker } = DatePicker
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
const ServiceListPage = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const { services, selectedStatus } = useSelector((state: RootState) => state.service)
  useEffect(() => {
    dispatch(fetchServices())
  }, [])
  const [renderCount, setRenderCount] = useState(0)
  const [filteredData, setFilteredData] = useState<IServices[]>(services)
  const filteredDevices = useMemo(() => {
    let filteredDevices = services

    if (selectedStatus !== 'all') {
      filteredDevices = filteredDevices.filter((device) => device.trangThaiHoatDong === selectedStatus)
    }

    return filteredDevices
  }, [services, selectedStatus])
  // ---------------TĂNG ĐẾM ĐỂ GÁN VÀO KEY VÀ GÁN LẠI GIÁ TRỊ-----------------
  useEffect(() => {
    setFilteredData(filteredDevices) // Cập nhật state khi danh sách thiết bị thay đổi
    setRenderCount((prevCount) => prevCount + 1)
  }, [filteredDevices])
  // 1. Lấy ra tất cả các key của object
  const getKeys = useCallback(() => {
    if (services && services.length > 0) {
      return Object.keys(services[0])
    } else {
      return []
    }
  }, [services])
  // 2. tạo thành 1 mảng đối tượng gồm key và dataIndex
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

  // 3. Tạo ra mảng title (tiêu đề của bảng)

  const dataTitle = ['Mã dịch vụ', 'Tên dịch vụ', 'Mô tả', 'Trạng thái hoạt động', 'Chi tiết', 'Tùy chỉnh']

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
  const handleStatusChange = useCallback(
    (data: any) => {
      console.log('file: ServiceListPage.tsx:200 ~ data:', data)

      dispatch(onChangeServiceStatus(data.value))
    },
    [dispatch]
  )

  return (
    <div className='pt-10 '>
      <PageInfor />
      <div className='flex h-full pl-10 pt-14  max-[1440px]:pl-5'>
        <div className=' flex   flex-col justify-between overflow-hidden'>
          <div>
            <h3 className='text-[25px] font-semibold text-primary min-[1500px]:text-[30px]'>Quản lý dịch vụ</h3>
            <div className='mt-10 flex justify-between'>
              <div className='flex gap-5'>
                <div className='flex w-[300px] flex-col gap-2'>
                  <span className='font-semibold'>Trạng thái hoạt động</span>
                  <Select
                    options={statusOptions}
                    styles={colourStyles}
                    onChange={handleStatusChange}
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
                    placeholder='Nhập từ khóa'
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
            {services.length > 0 ? (
              <CustomTable key={renderCount} data={filteredData} columns={columns} Key={'maDichVu'}></CustomTable>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className=' flex-shink-0 flex h-[250px] items-end p-5'>
          <NavLink
            to='/service/service-list/add-new-service'
            className={'flex flex-col items-center gap-2 rounded-lg bg-[#FFF2E7] p-5 text-primary shadow'}
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
            <span className='text-center'>Thêm dịch vụ</span>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default ServiceListPage

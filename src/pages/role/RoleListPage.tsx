import React, { useCallback, useEffect, useState } from 'react'
import { Avatar, Image } from 'antd'
import removeVietnameseTones from 'utils/convertVietnamese'
import CustomTable from 'components/table/CustomTable'
import getColumnDeviceConfig from 'utils/dataColumn'
import PageInfor from 'components/pageInfor/PageInfor'
import { NavLink } from 'react-router-dom'
import Select from 'react-select'
type Props = {}
const data = [
  {
    maThietBi: 'KO01',
    tenThietBi: 'Kiosk',
    diaChiIP: '192.168.1.10',
    trangThaiHoatDong: 'Ngưng hoạt động',
    trangThaiKetNoi: 'Mất kết nối',
    dichVuSuDung:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid tempora vero laboriosam beatae officia accusantium laudantium quam nobis explicabo eaque, possimus magni illum omnis a quod excepturi quos ullam dolor?',
    chiTiet: 'Chi tiết',
    tuyChinh: 'Cập nhật'
  },
  {
    maThietBi: 'KO03',
    tenThietBi: 'Kiosk',
    diaChiIP: '192.168.1.10',
    trangThaiHoatDong: 'Ngưng hoạt động',
    trangThaiKetNoi: 'Mất kết nối',
    dichVuSuDung:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid tempora vero laboriosam beatae officia accusantium laudantium quam nobis explicabo eaque, possimus magni illum omnis a quod excepturi quos ullam dolor?'
  }
]

// ---------------------DROPDOWN trạng thái hoạt động--------------------------
const statusOptions = [
  {
    value: 'all',
    label: 'Tất cả'
  },
  {
    value: 'active',
    label: 'Hoạt động'
  },
  {
    value: 'inactive',
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
    value: 'connected',
    label: 'Kết nối'
  },
  {
    value: 'unconnected',
    label: 'Mất kết nối'
  }
]
const RoleListPage = (props: Props) => {
  // useEffect(() => {
  //   const newDataState = data?.map((item) => {
  //     return {
  //       ...item,

  //     }
  //   })
  //   setNewData(newDataState)
  // }, [])
  // 1. Lấy ra tất cả các key của object
  const getKeys = useCallback(() => {
    return data && Object.keys(data[0])
  }, [])

  /* 2. Từ những key của object biến nó thành 1 mảng các đối tượng 
  ví dụ: [
    {
      dataIndex: "maLichChieu",
      key: "maLichChieu"
    }
  ]
*/
  const getDataIndexKey = useCallback(() => {
    const keys = getKeys()
    console.log('file: DeviceListPage.tsx:89 ~ keys:', keys)

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
    console.log('file: DeviceListPage.tsx:130 ~ newTitle:', newTitle)
    // dùng hàm find để tìm từ mảng các đối tượng dataIndexKey, so sánh giữa key với newTitle phía trên. Lưu ý là phải chuyển về in thường để so sánh
    const dataIndexKeyItem = dataIndexKey.find((item) => item?.key.toLowerCase() === newTitle)

    // trả về mảng các đối tượng
    return getColumnDeviceConfig(title, dataIndexKeyItem, newTitle)
  })
  console.log('file: DeviceListPage.tsx:136 ~ columns:', columns)

  //---------------------------Tìm kiếm trạng thái hoạt động------------------
  const handleStatusChange = (data: any) => {
    console.log(data)
  }
  //---------------------------Tìm kiếm trạng thái kết nối------------------
  const handleConnectionChange = (data: any) => {
    console.log(data)
  }
  // ----------------------------Thêm cột chi tiết và tùy chỉn ----------------

  return (
    <div className='pt-10 '>
      <PageInfor />
      <div className='flex h-full pl-10 pt-14  max-[1440px]:pl-5'>
        <div className=' flex   flex-col justify-between overflow-hidden'>
          <div>
            <h3 className='text-[25px] font-semibold text-primary min-[1500px]:text-[30px]'>Danh sách vai trò</h3>
            <div className='mt-10 flex justify-end'>
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
            <CustomTable data={data} columns={columns} Key={'maThietBi'}></CustomTable>
          </div>
        </div>
        <div className=' flex-shink-0 flex h-[250px] items-end p-5'>
          <button className='h-[80px] w-[150px] rounded-lg bg-[#FFF2E7]  shadow'>
            <NavLink
              to='/setting/role-manegement/add-role-manegement'
              className={'flex flex-col items-center gap-2 text-primary'}
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
              <span>Thêm vai trò</span>
            </NavLink>
          </button>
        </div>
      </div>
    </div>
  )
}

export default RoleListPage

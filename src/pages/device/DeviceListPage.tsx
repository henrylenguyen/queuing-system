import React, { useCallback } from 'react'
import { Avatar, Image } from 'antd'
import removeVietnameseTones from 'utils/convertVietnamese'
import CustomTable from 'components/table/CustomTable'
import getColumnDeviceConfig from 'utils/dataColumn'
import PageInfor from 'components/pageInfor/PageInfor'
type Props = {}
const data = [
  {
    maThietBi: 'KO01',
    tenThietBi: 'Kiosk',
    diaChiIP: '192.168.1.10',
    trangThaiHoatDong: 'Ngưng hoạt động',
    trangThaiKetNoi: 'Mất kết nối',
    dichVuSuDung:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid tempora vero laboriosam beatae officia accusantium laudantium quam nobis explicabo eaque, possimus magni illum omnis a quod excepturi quos ullam dolor?'
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

const DeviceListPage = (props: Props) => {
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
    return keys?.map((item) => {
      return {
        dataIndex: item,
        key: item
      }
    })
  }, [getKeys])
  const dataIndexKey = getDataIndexKey()
  console.log('dataIndexKey:', dataIndexKey)
  // 3. Tạo ra mảng title chứa các đối tượng title khác nhau, do mình nhập
  const dataTitle = [
    { title: 'Mã thiết bị' },
    { title: 'Tên thiết bị' },
    { title: 'Địa chỉ IP' },
    { title: 'Trạng thái hoạt động' },
    { title: 'Trạng thái kết nối' },
    { title: 'Dịch vụ sử dụng' },
    { title: '' },
    { title: '' }
  ]
  console.log('dataTitle:', dataTitle)

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
    const removeTone = removeVietnameseTones(title.title)
    /* Loại bỏ hết các khoảng trống ở giữa và biến thành in thường
   ví dụ: Mã lịch chiếu ->malichchieu
  */
    const newTitle = removeTone.replace(/\s+/g, '').toLowerCase()
    console.log('file: DeviceListPage.tsx:84 ~ newTitle:', newTitle)
    // dùng hàm find để tìm từ mảng các đối tượng dataIndexKey, so sánh giữa key với newTitle phía trên. Lưu ý là phải chuyển về in thường để so sánh
    const dataIndexKeyItem = dataIndexKey.find((item) => item?.key.toLowerCase() === newTitle)
    // trả về mảng các đối tượng
    return getColumnDeviceConfig(title, dataIndexKeyItem, newTitle)
  })
  console.log('columns:', columns)
  return (
    <div className='w-full pt-10'>
      <PageInfor activePage='Danh sách dịch vụ' prevPage='Dịch vụ' />
      <div className='flex h-full pl-10 pt-14  max-[1440px]:pl-5'>
        <div className=' flex w-[95%] flex-col justify-between'>
          <div>
            <h3 className='text-[25px] font-semibold text-primary min-[1500px]:text-[30px]'>Quản lý dịch vụ</h3>
            <CustomTable data={data} columns={columns} Key={'deviceCode'}></CustomTable>
          </div>
        </div>
        <div className=' flex-shink-0  w-[5%]  '>
          <button>Thêm dịch vụ</button>
        </div>
      </div>
    </div>
  )
}

export default DeviceListPage

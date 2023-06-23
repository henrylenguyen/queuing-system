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
import { NavLink } from 'react-router-dom'
import { fetchReport } from 'redux/action/report/report.action'
import { fetchRoles } from 'redux/action/roles/roleList.action'
import { onChangeNumberDatePickerReport } from 'redux/slice/report.slice'
import { AppDispatch, RootState } from 'redux/store'
import removeVietnameseTones from 'utils/convertVietnamese'
import getColumnDeviceConfig from 'utils/dataColumn'
// import
type Props = {}

// ---------------------DROPDOWN trạng thái hoạt động--------------------------

const RoleListPage = (props: Props) => {
  const { roles, isLoading } = useSelector((state: RootState) => state.role)
  const dispatch = useDispatch<AppDispatch>()
  //-------------------------GỌI DỮ LIỆU TỪ FIRESTORE-----------------------
  useEffect(() => {
    dispatch(fetchRoles())
  }, [])



  //------------------------------SỬ LÝ BẢNG----------------------------------
  // 1. Lấy ra tất cả các key của object
  const getKeys = useCallback(() => {
    if (roles && roles?.length > 0) {
      return Object.keys(roles[0])
    } else {
      return []
    }
  }, [roles])

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
  const dataTitle = ['Tên vai trò', 'Số người dùng', 'Mô tả', 'Tùy chỉnh']

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
                <h3 className='text-[25px] font-semibold text-primary min-[1500px]:text-[30px]'>Danh sách vai trò</h3>
                <div className='mt-10 flex justify-end gap-5'>
                  <div className='relative flex flex-col gap-2 '>
                    <span className='font-semibold'>Từ khoá</span>
                    <div className='w-[200px]'>
                      <input
                        type='text'
                        className='w-full rounded-md border border-gray-300 bg-white p-2'
                        placeholder='Tìm tên vai trò'
                        // onChange={handleSearch}
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
                {roles.length > 0 ? <CustomTable data={roles} columns={columns} Key={'tenVaiTro'}></CustomTable> : ''}
              </div>
            </div>
            <div className=' flex-shink-0 flex h-[350px] flex-col items-end gap-5 p-5'>
              <NavLink
                to='/role/role-manegement/add-new-role'
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
                <span className='text-center'>Thêm vai trò</span>
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RoleListPage

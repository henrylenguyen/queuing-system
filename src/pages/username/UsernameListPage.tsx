import PageInfor from 'components/pageInfor/PageInfor'
import CustomTable from 'components/table/CustomTable'
import { IAuth } from 'constants/interface/auth.interface'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Select from 'react-select'
import { fetchUserRole, fetchUsers } from 'redux/action/users/users.action'
import { onChangeSelectedRole } from 'redux/slice/userSlice'
import { AppDispatch, RootState } from 'redux/store'
import removeVietnameseTones from 'utils/convertVietnamese'
import getColumnDeviceConfig from 'utils/dataColumn'
type Props = {}

const UsernameListPage = React.memo((props: Props) => {
  const { users, userRole, selectedRole } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>()
  const [filteredData, setFilteredData] = useState<IAuth[]>(users)
  const [renderCount, setRenderCount] = useState(0)
  const MemoizedCustomTable = React.memo(CustomTable)

  const filterUser = useMemo(() => {
    let filterUser = users

    if (selectedRole !== 'all') {
      filterUser = filterUser.filter((user) => user.vaiTro === selectedRole)
    }

    return filterUser
  }, [users, selectedRole])

  // ----- GỌI DANH SÁCH NGƯỜI DÙNG VÀ VAI TRÒ TỪ FIRESTORE--------------------
  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchUserRole())
  }, [dispatch])
  // ---------------TĂNG ĐẾM ĐỂ GÁN VÀO KEY VÀ GÁN LẠI GIÁ TRỊ-----------------
  useEffect(() => {
    setFilteredData(filterUser) // Cập nhật state khi danh sách người dùng thay đổi
    setRenderCount((prevCount) => prevCount + 1)
  }, [filterUser])
  // 1. Lấy ra tất cả các key của object
  const getKeys = useCallback(() => {
    if (users && users.length > 0) {
      return Object.keys(users[0])
    } else {
      return []
    }
  }, [users])

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
  const dataTitle = ['Tài khoản', 'Họ tên', 'Số điện thoại', 'Email', 'Vai trò', 'Trạng thái hoạt động', 'Tùy chỉnh']

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
  // ------------------LẤY VAI TRÒ NGƯỜI DÙNG-------------
  const RoleOfUsers = useCallback(() => {
    const newUserRole = userRole?.map((user) => {
      return {
        value: user.vaiTro,
        label: user.vaiTro
      }
    })
    const newUserRoleOptions = [
      {
        label: 'Tất cả',
        value: 'all'
      },
      ...newUserRole
    ]
    return newUserRoleOptions
  }, [userRole])

  const roleOfUsers = RoleOfUsers()

  const handleConnectionChange = useCallback(
    (data: any) => {
      dispatch(onChangeSelectedRole(data.value))
    },
    [dispatch]
  )

  // ----------------------------Thêm cột chi tiết và tùy chỉn ----------------

  return (
    <div className='pt-10 '>
      <PageInfor />
      <div className='flex h-full pl-10 pt-14  max-[1440px]:pl-5'>
        <div className=' flex   flex-col justify-between overflow-hidden'>
          <div>
            <h3 className='text-[25px] font-semibold text-primary min-[1500px]:text-[30px]'>Danh sách tài khoản</h3>
            <div className='mt-10 flex justify-between'>
              <div className='flex gap-5'>
                <div className='flex w-[300px] flex-col gap-2'>
                  <span className='font-semibold'>Tên vai trò</span>
                  <Select options={roleOfUsers} onChange={handleConnectionChange} placeholder='Chọn trạng thái' />
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
            {users.length > 0 ? (
              <MemoizedCustomTable
                key={renderCount}
                data={filteredData}
                columns={columns}
                Key={'taiKhoan'}
              ></MemoizedCustomTable>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className=' flex-shink-0 flex h-[250px] items-end p-5'>
          <NavLink
            to='/account/account-list/add-new-account'
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
            <span className='text-center'>Thêm tài khoản</span>
          </NavLink>
        </div>
      </div>
    </div>
  )
})

export default UsernameListPage

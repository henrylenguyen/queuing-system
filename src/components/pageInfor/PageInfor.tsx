import Badge from '@mui/material/Badge'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import { Avatar } from 'antd'
import { NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { DynamicObject } from 'constants/interface/formInterface'
const PageInfor = () => {
  const location = useLocation()
  const pathname = location.pathname
  // Tách đường dẫn hiện tại thành các phần riêng biệt sau mỗi dấu '/'
  const pathParts = pathname.split('/').filter((part) => part !== '')
  const [firstNavLinkDisabled, setFirstNavLinkDisabled] = useState(true)
  const { user } = useSelector((state: RootState) => state.auth)
  // Dùng các phần đã tách để tạo breadcrumb
  const handleConvert = (part: string) => {
    switch (part) {
      case 'device':
        part = 'Thiết bị'
        break
      case 'device-list':
        part = 'Danh sách thiết bị'
        break
      case 'add-new-device':
        part = 'Thêm thiết bị'
        break
      case 'device-detail':
        part = 'Danh sách thiết bị'
        break
      case 'update-device':
        part = 'Cập nhật thiết bị'
        break
      case 'service':
        part = 'Dịch vụ'
        break
      case 'service-list':
        part = 'Danh sách dịch vụ'
        break
      case 'add-new-service':
        part = 'Thêm dịch vụ'
        break
      case 'update-service':
        part = 'Cập nhật dịch vụ'
        break
      case 'service-detail':
        part = 'Thông tin dịch vụ'
        break
      case 'number':
        part = 'Cấp số'
        break
      case 'number-list':
        part = 'Danh sách cấp số'
        break
      case 'add-new-number':
        part = 'Cấp số mới'
        break
      case 'add-new-number-without-infor':
        part = 'Cấp số mới không đăng nhập'
        break
      case 'number-detail':
        part = 'Thông tin cấp số'
        break
      case 'report':
        part = 'Báo cáo'
        break
      case 'report-list':
        part = 'Lập báo cáo'
        break
      case 'setting':
        part = 'Cài đặt hệ thống'
        break
      case 'role-manegement':
        part = 'Quản lý vai trò'
        break
      case 'add-role-manegement':
        part = 'Thêm vai trò'
        break
      case 'account-manegement':
        part = 'Quản lý tài khoản'
        break
      case 'add-new-account':
        part = 'Thêm tài khoản'
        break
      case 'update-account':
        part = 'Cập nhật tài khoản'
        break
      case 'user-diary':
        part = 'Nhật ký hoạt động'
        break
      default:
        part = ''
        break
    }
    return part
  }

  return (
    <div className='relative z-40 flex w-full items-center  justify-between px-10'>
      {pathParts.length === 0 ? (
        <div>
          <h3 className='text-[20px] font-semibold text-primary'>Thông tin cá nhân</h3>
        </div>
      ) : (
        <nav className='text-sm' aria-label='Breadcrumb'>
          <ol className='flex list-none gap-2 p-0'>
            {pathParts.map((part: string, index: number) => (
              <li key={index} className={`flex items-center gap-2`}>
                <NavLink
                  to={`/${pathParts.slice(0, index + 1).join('/')}`}
                  className={`text-[20px] font-semibold ${
                    index === pathParts.length - 1 ? 'text-primary' : 'text-[#7E7D88]'
                  } ${index === 0 && firstNavLinkDisabled ? 'disabled' : ''}`}
                >
                  {String(handleConvert(part))}
                </NavLink>

                {index !== pathParts.length - 1 && (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={3}
                    stroke='#7E7D88'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      <div className='flex gap-5'>
        <button className='rounded-full bg-[#FFF2E7] p-2'>
          <Badge badgeContent={4} color='primary'>
            <NotificationsActiveIcon sx={{ color: '#FFAC6A' }} fontSize='medium' />
          </Badge>
        </button>
        <NavLink className='flex gap-4' to='/'>
          <Avatar src={user?.avatar} size='large' />
          <div className='flex flex-col gap-2'>
            <span className='text-[13px] font-semibold text-gray-500'>Xin chào</span>
            <span className='font-semibold'>{user?.hoTen}</span>
          </div>
        </NavLink>
      </div>
    </div>
  )
}

export default PageInfor

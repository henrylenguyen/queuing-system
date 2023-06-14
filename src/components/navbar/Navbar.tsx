import { Modal, message } from 'antd'
import logo from 'assets/images/Logo-alta.svg'
import { navbar, settingNav } from 'constants/navbar'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { logOut } from 'redux/slice/auth.slice'
import { AppDispatch, RootState } from 'redux/store'
import { useLocalStorage } from 'usehooks-ts'
import logoutImage from 'assets/images/open_a_door.gif'
import { changeSettingStatus, changeStateSettingNav } from 'redux/slice/nav.slice'
type Props = {}
const Navbar = (props: Props) => {
  const { isActive, isClick, isSetting } = useSelector((state: RootState) => state.navbar)
  const [logged] = useLocalStorage('islogin', { islogin: false, id: '' })
  const navigate = useNavigate()
  const [local, setLocal] = useLocalStorage('isSetting', false)
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const location = useLocation()
  const pathname = location.pathname
  // Tách đường dẫn hiện tại thành các phần riêng biệt sau mỗi dấu '/'
  const pathParts = pathname.split('/').filter((part) => part !== '')
  const dispatch = useDispatch<AppDispatch>()

  const showModal = () => {
    setOpen(true)
  }
  // Xóa trạng thái của local khi tải trang lần đầu
  useEffect(() => {
    if (!['account', 'user', 'role'].includes(pathParts[0])) {
      setLocal(false)
    }
  }, [])

  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      if (logged) {
        localStorage.removeItem('islogin')
        dispatch(logOut())
        message.info('Đăng xuất thành công')
      }
      navigate('/login')
      setOpen(false)
      setConfirmLoading(false)
    }, 2000)
  }

  const handleCancel = () => {
    setOpen(false)
  }
  const handleToggleSubNav = (value: boolean) => {
    dispatch(changeStateSettingNav(value))
    dispatch(changeSettingStatus(value))
    setLocal(value)
  }
  const handleCloseSubNav = () => {
    //kiểm tra đường dẫn hiện tại, nếu nó không phải đang là đường dân của setting thì bấm nút close sẽ xóa trạng thái của subNav
    if (!['account', 'user', 'role'].includes(pathParts[0])) {
      dispatch(changeStateSettingNav(false))
      dispatch(changeSettingStatus(false))
      setLocal(false)
    } else {
      dispatch(changeStateSettingNav(false))
    }
  }
  return (
    <div
      className={`flex w-[15%] flex-shrink-0  flex-col items-center justify-between bg-white py-8  ${
        isActive ? 'active-bar' : 'inactive-bar'
      }`}
    >
      {isActive ? (
        <>
          <div className='flex w-full  flex-col items-center'>
            <NavLink onClick={() => handleToggleSubNav(false)}  to='/'>
              <img src={logo} alt='logo' className='w-full' />
            </NavLink>
            <nav className='relative  mt-16 flex w-full flex-col  items-center  text-gray-500'>
              {navbar.map(({ name, to, icon }) => (
                <NavLink
                  onClick={() => handleToggleSubNav(false)}
                  to={to}
                  key={name}
                  className={({ isActive }) =>
                    (isActive && !isClick ? 'bg-primary text-white ' : '') +
                    'flex w-full items-center justify-center px-2 py-8 font-bold'
                  }
                >
                  {icon}
                </NavLink>
              ))}
              {/* Nút cài đặt hệ thống */}
              <button
                className={`flex w-full flex-shrink-0 items-center gap-2 px-3 py-5 min-[1900px]:px-5 ${
                  (isSetting || local) && 'bg-primary text-white'
                }`}
                onClick={() => handleToggleSubNav(true)}
              >
                <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M8.68578 18.0437L8.68301 18.0421L4.11493 15.4093C3.16175 14.7663 2.78258 14.4693 2.59073 14.1388C2.40772 13.8237 2.36667 13.4258 2.36667 12.4087V7.59199C2.36667 6.57339 2.40559 6.17441 2.58449 5.86024C2.77032 5.53392 3.13834 5.24176 4.07395 4.60765L8.67509 1.94996L8.67617 1.94933C9.02135 1.74879 9.49263 1.63574 9.9875 1.63574C10.4824 1.63574 10.9537 1.74879 11.2988 1.94933L11.3004 1.95024L15.8851 4.59142C16.8383 5.23437 17.2174 5.5314 17.4093 5.86181C17.5923 6.177 17.6333 6.57483 17.6333 7.59199V12.4003C17.6333 13.4189 17.5944 13.8179 17.4155 14.1321C17.2297 14.4584 16.8617 14.7506 15.9261 15.3847L11.3261 18.0417C11.3259 18.0418 11.3257 18.0419 11.3255 18.042C10.9669 18.2477 10.4907 18.3587 10 18.3587C9.50799 18.3587 9.03359 18.2472 8.68578 18.0437ZM4.23307 4.81747L4.21803 4.82616L4.20364 4.83587L4.18752 4.84675C3.86164 5.06666 3.59376 5.24744 3.38776 5.41047C3.17516 5.57872 2.99255 5.7551 2.86229 5.97965C2.72902 6.2094 2.67395 6.44876 2.64865 6.70466C2.62498 6.94414 2.62499 7.23234 2.625 7.56891L2.625 7.59199V12.4003L2.625 12.4238C2.62499 12.76 2.62498 13.0487 2.64928 13.2892C2.67533 13.5468 2.73203 13.7872 2.86795 14.0184C3.00031 14.2434 3.18561 14.4215 3.40206 14.5926C3.61237 14.7588 3.88614 14.9441 4.22055 15.1703L4.23646 15.1811L4.2513 15.1911L4.26681 15.2001L8.81681 17.8251L8.81702 17.8252C9.16297 18.0246 9.60364 18.1045 10.0042 18.1045C10.4047 18.1045 10.8454 18.0246 11.1913 17.8252L11.1919 17.8249L15.7753 15.1748L15.7909 15.1658L15.8059 15.1556L15.822 15.1447C16.1458 14.9248 16.4121 14.744 16.6169 14.5809C16.8284 14.4125 17.01 14.236 17.1394 14.0115C17.2718 13.782 17.3264 13.5429 17.3515 13.2874C17.375 13.048 17.375 12.76 17.375 12.4233V12.4003V7.59199V7.56856C17.375 7.23229 17.375 6.94359 17.3507 6.70316C17.3247 6.44552 17.268 6.20512 17.132 5.97396C16.9997 5.74887 16.8144 5.57082 16.5979 5.39973C16.3876 5.23349 16.1138 5.04824 15.7794 4.82195L15.7635 4.81122L15.7487 4.80118L15.7332 4.79223L11.1862 2.16898C11.1857 2.16867 11.1851 2.16836 11.1846 2.16805C10.8382 1.96552 10.3984 1.89199 10 1.89199C9.60156 1.89199 9.1617 1.96554 8.81523 2.16814L4.23307 4.81747Z'
                    stroke='currentColor'
                  />
                  <path
                    d='M10 12.625C8.55114 12.625 7.375 11.4489 7.375 10C7.375 8.55114 8.55114 7.375 10 7.375C11.4489 7.375 12.625 8.55114 12.625 10C12.625 11.4489 11.4489 12.625 10 12.625ZM10 7.625C8.69052 7.625 7.625 8.69052 7.625 10C7.625 11.3095 8.69052 12.375 10 12.375C11.3095 12.375 12.375 11.3095 12.375 10C12.375 8.69052 11.3095 7.625 10 7.625Z'
                    fill='#292D32'
                    stroke='currentColor'
                  />
                </svg>
              </button>
              {/* MENU CON */}
              {isClick && (
                <div className='absolute -bottom-[20%] left-[100%] z-10 w-[200px] overflow-hidden rounded-r-xl bg-white shadow-nav'>
                  <div className='flex justify-end p-2'>
                    <svg
                      onClick={() => handleCloseSubNav()}
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='#FF9138'
                      className='h-4 w-4 cursor-pointer'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                    </svg>
                  </div>
                  {settingNav?.map(({ name, to }) => (
                    <NavLink to={to} key={name} onClick={() => dispatch(changeStateSettingNav(false))}>
                      <div className='flex w-full items-center gap-2 p-5 hover:bg-primary hover:text-white'>{name}</div>
                    </NavLink>
                  ))}
                </div>
              )}
            </nav>
          </div>
          {/* NÚT ĐĂNG XUẤT CỦA NAVBAR ở trạng thái menu thu nhỏ */}
          <button
            className='flex w-[90%] items-center gap-3 rounded-lg bg-[#FFF2E7] p-3 text-primary'
            onClick={showModal}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9'
              />
            </svg>
          </button>
        </>
      ) : (
        <>
          <div className='flex w-full flex-col items-center min-[1900px]:h-screen'>
            <NavLink onClick={() => handleToggleSubNav(false)} to='/'>
              <img src={logo} alt='logo' className='w-[150px]' />
            </NavLink>
            <nav className='relative mt-16 flex w-full flex-col text-gray-500'>
              {navbar.map(({ name, to, icon }) => (
                <NavLink
                  onClick={() => handleToggleSubNav(false)}
                  to={to}
                  key={name}
                  className={({ isActive }) => (isActive && !isClick ? 'bg-primary text-white' : '')}
                >
                  <div className='flex w-full items-center gap-2 p-5'>
                    {icon}
                    {name}
                  </div>
                </NavLink>
              ))}

              <button
                className={`flex w-full items-center gap-2 p-5 ${(isSetting || local) && 'bg-primary text-white'}`}
                onClick={() => handleToggleSubNav(true)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-5 w-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z'
                  />
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
                Cài đặt hệ thống
              </button>
              {/* MENU CON */}
              {isClick && (
                <div className='absolute -bottom-[20%] -right-[89%] z-10 overflow-hidden rounded-r-xl bg-white shadow-nav min-[1500px]:-right-[63%]'>
                  <div className='flex justify-end p-2'>
                    <svg
                      onClick={() => handleCloseSubNav()}
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='#FF9138'
                      className='h-4 w-4 cursor-pointer'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                    </svg>
                  </div>
                  {settingNav?.map(({ name, to }) => (
                    <NavLink to={to} key={name} onClick={() => dispatch(changeStateSettingNav(false))}>
                      <div className='flex w-full items-center gap-2 p-5 hover:bg-primary hover:text-white'>{name}</div>
                    </NavLink>
                  ))}
                </div>
              )}
            </nav>
          </div>
          {/* Nút đăng xuất của navbar ở trạng thái bình thường */}
          <button
            className='flex w-[90%] items-center gap-3 rounded-lg bg-[#FFF2E7] p-3 text-primary'
            onClick={showModal}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9'
              />
            </svg>
            Đăng xuất
          </button>
        </>
      )}
      <Modal
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        wrapClassName='custom-modal-logout'
        okText='Đồng ý'
        cancelText='Hủy'
      >
        <div className='flex flex-col items-center justify-center gap-10'>
          <h3 className='text-[25px] font-bold text-primary'>Bạn có muốn đăng xuất khỏi hệ thống hay không?</h3>
          <img src={logoutImage} alt='log out' className='h-[230px] w-[230px]' />
        </div>
      </Modal>
    </div>
  )
}

export default Navbar

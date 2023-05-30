import React, { useState } from 'react'
import logo from 'assets/images/Logo-alta.svg'
import setting from 'assets/images/setting.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { settingNav, navbar } from 'constants/navbar'
import { useDispatch, useSelector } from 'react-redux'
import { useLocalStorage } from 'usehooks-ts'
import { AppDispatch, RootState } from 'redux/store'
import { logOut } from 'redux/slice/authSlice'
import { message } from 'antd'
type Props = {}
const Navbar = (props: Props) => {
  const { isActive } = useSelector((state: RootState) => state.navbar)
  const [forcus, setForcus] = useState(false)
  const [isSettingButtonHovered, setIsSettingButtonHovered] = useState(false)
  const [logged] = useLocalStorage('islogin', { islogin: false, id: '' })
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const handleChangeMouseEnter = () => {
    setIsSettingButtonHovered(true)
    setForcus(true)
  }
  const handleMouseOver = () => {
    setIsSettingButtonHovered(false)
    setForcus(!forcus)
  }
  const handleLogout = () => {
    if (logged) {
      localStorage.removeItem('islogin')
      dispatch(logOut())
      message.info('Đăng xuất thành công')
    }
    navigate('/login')
  }
  return (
    <div
      className={`flex w-[15%] flex-shrink-0 flex-col items-center justify-between bg-white py-8 min-[1500px]:h-screen ${
        isActive ? 'active-bar' : 'inactive-bar'
      }`}
    >
      {isActive ? (
        <>
          <div className='flex w-full  flex-col items-center'>
            <NavLink to='/'>
              <img src={logo} alt='logo' className='w-full' />
            </NavLink>
            <nav className='mt-16 flex w-full flex-col  items-center  text-gray-500'>
              {navbar.map(({ name, to, icon }) => (
                <NavLink
                  to={to}
                  key={name}
                  className={({ isActive }) =>
                    (isActive ? 'bg-primary text-white ' : '') +
                    'flex w-full items-center justify-center px-2 py-8 font-bold'
                  }
                >
                  {icon}
                </NavLink>
              ))}
              <button className='flex w-full items-center gap-2 p-5'>
                <img src={setting} alt='setting' />
              </button>
            </nav>
          </div>
          <button className='flex w-[90%] items-center gap-3 rounded-lg bg-[#FFF2E7] p-3 text-primary'>
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
          <div className='flex w-full flex-col items-center'>
            <NavLink to='/'>
              <img src={logo} alt='logo' className='w-[150px]' />
            </NavLink>
            <nav className='relative mt-16 flex w-full flex-col text-gray-500'>
              {navbar.map(({ name, to, icon }) => (
                <NavLink
                  onClick={() => setForcus(false)}
                  to={to}
                  key={name}
                  className={({ isActive }) => (isActive && !forcus ? 'bg-primary text-white' : '')}
                >
                  <div className='flex w-full items-center gap-2 p-5'>
                    {icon}
                    {name}
                  </div>
                </NavLink>
              ))}
              <button
                className={`flex w-full items-center gap-2 p-5 ${forcus && 'bg-primary text-white'}`}
                onMouseEnter={() => setForcus(true)}
                onMouseLeave={() => setForcus(false)}
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
              {(forcus || isSettingButtonHovered) && (
                <div
                  className='absolute -bottom-[20%] -right-[89%] z-10 overflow-hidden rounded-r-xl bg-white shadow-nav min-[1500px]:-right-[63%]'
                  onMouseEnter={() => handleChangeMouseEnter()}
                  onMouseLeave={() => handleMouseOver()}
                >
                  {settingNav?.map(({ name, to }) => (
                    <NavLink to={to} key={name}>
                      <div className='flex w-full items-center gap-2 p-5 hover:bg-primary hover:text-white'>{name}</div>
                    </NavLink>
                  ))}
                </div>
              )}
            </nav>
          </div>
          <button
            className='flex w-[90%] items-center gap-3 rounded-lg bg-[#FFF2E7] p-3 text-primary'
            onClick={() => handleLogout()}
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
    </div>
  )
}

export default Navbar

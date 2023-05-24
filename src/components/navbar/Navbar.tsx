import React, { useState } from 'react'
import logo from 'assets/images/Logo-alta.svg'
import setting from 'assets/images/setting.svg'
import { NavLink } from 'react-router-dom'
import navbar from 'constants/navbar'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
type Props = {}
const Navbar = (props: Props) => {
  const { isActive } = useSelector((state: RootState) => state.navbar)

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
            <nav className='mt-16 flex w-full flex-col text-gray-500'>
              {navbar.map(({ name, to, icon }) => (
                <NavLink to={to} key={name} className={({ isActive }) => (isActive ? 'bg-primary text-white' : '')}>
                  <div className='flex w-full items-center gap-2 p-5'>
                    {icon}
                    {name}
                  </div>
                </NavLink>
              ))}
              <button className='flex w-full items-center gap-2 p-5'>
                <img src={setting} alt='setting' />
                Cài đặt hệ thống
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
            Đăng xuất
          </button>
        </>
      )}
    </div>
  )
}

export default Navbar

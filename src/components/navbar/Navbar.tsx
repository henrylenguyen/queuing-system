import React from 'react'
import logo from 'assets/images/Logo-alta.svg'
import setting from 'assets/images/setting.svg'
import { NavLink } from 'react-router-dom'
import navbar from 'constants/navbar'
type Props = {}
const Navbar = (props: Props) => {
  return (
    <div className='flex h-screen w-[250px] flex-shrink-0 flex-col items-center bg-white py-8'>
      <img src={logo} alt='logo' className='w-[150px]' />
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
  )
}

export default Navbar

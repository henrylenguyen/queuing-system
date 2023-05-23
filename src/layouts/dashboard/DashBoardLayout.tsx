import Navbar from 'components/navbar/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import React, { useState } from 'react'
import { RootState, AppDispatch } from '../../redux/store'
import { changeStateNav } from 'redux/slice/navSlice'
type Props = {
  children?: React.ReactNode
}

const DashBoardLayout = ({ children }: Props) => {
  const { isActive } = useSelector((state: RootState) => state.navbar)
  const dispatch = useDispatch<AppDispatch>()
  return (
    <div className='flex h-auto'>
      <Navbar />
      <div className={`relative ${isActive ? 'w-[97%]' : 'w-[85%]'}`}>
        {children}
        <button className='absolute top-0 bg-primary text-white' onClick={() => dispatch(changeStateNav(!isActive))}>
          {isActive ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5' />
            </svg>
          ) : (
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
                d='M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5'
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}

export default DashBoardLayout

import React from 'react'
import { Progress } from 'antd'

type Props = {}

const OverviewDashBoard = (props: Props) => {
  return (
    <div className='flex flex-col gap-5'>
      {/* ---------------------Thiết bị----------------------------- */}
      <div className='flex w-full items-center gap-3 rounded-2xl p-4 shadow-md min-[1550px]:gap-5'>
        <Progress type='circle' percent={90} size={50} strokeColor='#FF7506' />
        <div className='flex flex-col gap-3 text-[#FF7506]'>
          <span className='text-[35px] font-bold text-[#535261] max-[1440px]:text-[20px]'>4.221</span>
          <div className='flex items-center gap-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='icon icon-tabler icon-tabler-device-desktop'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              stroke-width='2'
              stroke='currentColor'
              fill='none'
              stroke-linecap='round'
              stroke-linejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
              <path d='M3 5a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-10z'></path>
              <path d='M7 20h10'></path>
              <path d='M9 16v4'></path>
              <path d='M15 16v4'></path>
            </svg>
            <span className='text-[14px] font-semibold'>Thiết bị</span>
          </div>
        </div>
        <div>
          <ul className='flex flex-col gap-3'>
            <li>
              Đang hoạt động: <span className='text-[25px] font-bold text-primary max-[1440px]:text-[15px]'>3.799</span>
            </li>
            <li>
              Ngưng hoạt động:{' '}
              <span className='text-[25px] font-bold text-primary max-[1440px]:text-[15px]'>3.799</span>
            </li>
          </ul>
        </div>
      </div>
      {/* ---------------------dịch vụ----------------------------- */}
      <div className='flex w-full items-center gap-3 rounded-2xl p-4 shadow-md min-[1550px]:gap-5'>
        <Progress type='circle' percent={76} size={50} strokeColor='#4277FF' />
        <div className='flex flex-col gap-3 text-[#4277FF]'>
          <span className='text-[35px] font-bold text-[#535261] max-[1440px]:text-[20px]'>276</span>
          <div className='flex items-center gap-1'>
            <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 20 20'>
              <path
                fill='currentColor'
                d='M8.492 4.901c-.358.07-.75.302-1.058.846a.5.5 0 1 1-.87-.494C7.005 4.477 7.632 4.05 8.3 3.92a2.43 2.43 0 0 1 1.792.361c.484.32.875.843.887 1.47c.013.655-.385 1.246-1.119 1.68c-.498.294-.692.494-.775.627C9.015 8.17 9 8.272 9 8.5a.5.5 0 0 1-1 0c0-.272.014-.61.237-.97c.21-.337.569-.637 1.115-.96c.535-.317.632-.618.629-.798c-.004-.207-.142-.46-.44-.657a1.431 1.431 0 0 0-1.048-.214Zm.257 6.599a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5ZM8.499 1a6.5 6.5 0 0 0-5.675 9.672l-.795 2.082a1 1 0 0 0 1.204 1.32l2.487-.697A6.5 6.5 0 1 0 8.5 1ZM3 7.5a5.5 5.5 0 1 1 2.998 4.9l-.174-.09l-2.86.801l.969-2.536l-.128-.21A5.472 5.472 0 0 1 2.999 7.5Zm8.463 9.5a6.485 6.485 0 0 1-4.927-2.26a7.456 7.456 0 0 0 1.76.257A5.475 5.475 0 0 0 11.462 16c.902 0 1.752-.217 2.502-.6l.174-.09l2.86.801l-.969-2.536l.128-.21c.51-.834.805-1.814.805-2.865a5.474 5.474 0 0 0-.964-3.11a7.5 7.5 0 0 0-.235-1.763a6.484 6.484 0 0 1 2.199 4.873c0 1.151-.3 2.233-.825 3.172l.795 2.082a1 1 0 0 1-1.203 1.32l-2.488-.697c-.843.4-1.786.623-2.78.623Z'
              ></path>
            </svg>
            <span className='text-[14px] font-semibold'>Dịch vụ</span>
          </div>
        </div>
        <div>
          <ul className='flex flex-col gap-3'>
            <li>
              Đang hoạt động:{' '}
              <span className='text-[25px] font-bold text-[#4277FF] max-[1440px]:text-[15px]'>3.799</span>
            </li>
            <li>
              Ngưng hoạt động:{' '}
              <span className='text-[25px] font-bold text-[#4277FF] max-[1440px]:text-[15px]'>3.799</span>
            </li>
          </ul>
        </div>
      </div>
      {/* ---------------------Cấp số----------------------------- */}
      <div className='flex w-full items-center gap-3 rounded-2xl p-4 shadow-md min-[1550px]:gap-5'>
        <Progress type='circle' percent={86} size={50} strokeColor='#35C75A' />
        <div className='flex flex-col gap-3 text-[#35C75A]'>
          <span className='text-[35px] font-bold text-[#535261] max-[1440px]:text-[20px]'>276</span>
          <div className='flex items-center gap-1'>
            <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 20 20'>
              <path
                fill='currentColor'
                d='M8.492 4.901c-.358.07-.75.302-1.058.846a.5.5 0 1 1-.87-.494C7.005 4.477 7.632 4.05 8.3 3.92a2.43 2.43 0 0 1 1.792.361c.484.32.875.843.887 1.47c.013.655-.385 1.246-1.119 1.68c-.498.294-.692.494-.775.627C9.015 8.17 9 8.272 9 8.5a.5.5 0 0 1-1 0c0-.272.014-.61.237-.97c.21-.337.569-.637 1.115-.96c.535-.317.632-.618.629-.798c-.004-.207-.142-.46-.44-.657a1.431 1.431 0 0 0-1.048-.214Zm.257 6.599a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5ZM8.499 1a6.5 6.5 0 0 0-5.675 9.672l-.795 2.082a1 1 0 0 0 1.204 1.32l2.487-.697A6.5 6.5 0 1 0 8.5 1ZM3 7.5a5.5 5.5 0 1 1 2.998 4.9l-.174-.09l-2.86.801l.969-2.536l-.128-.21A5.472 5.472 0 0 1 2.999 7.5Zm8.463 9.5a6.485 6.485 0 0 1-4.927-2.26a7.456 7.456 0 0 0 1.76.257A5.475 5.475 0 0 0 11.462 16c.902 0 1.752-.217 2.502-.6l.174-.09l2.86.801l-.969-2.536l.128-.21c.51-.834.805-1.814.805-2.865a5.474 5.474 0 0 0-.964-3.11a7.5 7.5 0 0 0-.235-1.763a6.484 6.484 0 0 1 2.199 4.873c0 1.151-.3 2.233-.825 3.172l.795 2.082a1 1 0 0 1-1.203 1.32l-2.488-.697c-.843.4-1.786.623-2.78.623Z'
              ></path>
            </svg>
            <span className='text-[14px] font-semibold'>Dịch vụ</span>
          </div>
        </div>
        <div>
          <ul className='flex flex-col gap-3'>
            <li>
              Đang hoạt động:{' '}
              <span className='text-[25px] font-bold text-[#35C75A] max-[1440px]:text-[15px]'>3.799</span>
            </li>
            <li>
              Ngưng hoạt động:{' '}
              <span className='text-[25px] font-bold text-[#35C75A] max-[1440px]:text-[15px]'>3.799</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default OverviewDashBoard
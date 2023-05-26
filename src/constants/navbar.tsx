export const navbar = [
  {
    name: 'Dashboard',
    to: '/dashboard',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='icon icon-tabler icon-tabler-category'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        strokeWidth='2'
        stroke='currentColor'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
        <path d='M4 4h6v6h-6z'></path>
        <path d='M14 4h6v6h-6z'></path>
        <path d='M4 14h6v6h-6z'></path>
        <path d='M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0'></path>
      </svg>
    )
  },
  {
    name: 'Thiết bị',
    to: '/device/device-list',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='icon icon-tabler icon-tabler-device-desktop'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        strokeWidth='2'
        stroke='currentColor'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
        <path d='M3 5a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-10z'></path>
        <path d='M7 20h10'></path>
        <path d='M9 16v4'></path>
        <path d='M15 16v4'></path>
      </svg>
    )
  },
  {
    name: 'Dịch vụ',
    to: '/service/service-list',
    icon: (
      <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 20 20'>
        <path
          fill='currentColor'
          d='M8.492 4.901c-.358.07-.75.302-1.058.846a.5.5 0 1 1-.87-.494C7.005 4.477 7.632 4.05 8.3 3.92a2.43 2.43 0 0 1 1.792.361c.484.32.875.843.887 1.47c.013.655-.385 1.246-1.119 1.68c-.498.294-.692.494-.775.627C9.015 8.17 9 8.272 9 8.5a.5.5 0 0 1-1 0c0-.272.014-.61.237-.97c.21-.337.569-.637 1.115-.96c.535-.317.632-.618.629-.798c-.004-.207-.142-.46-.44-.657a1.431 1.431 0 0 0-1.048-.214Zm.257 6.599a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5ZM8.499 1a6.5 6.5 0 0 0-5.675 9.672l-.795 2.082a1 1 0 0 0 1.204 1.32l2.487-.697A6.5 6.5 0 1 0 8.5 1ZM3 7.5a5.5 5.5 0 1 1 2.998 4.9l-.174-.09l-2.86.801l.969-2.536l-.128-.21A5.472 5.472 0 0 1 2.999 7.5Zm8.463 9.5a6.485 6.485 0 0 1-4.927-2.26a7.456 7.456 0 0 0 1.76.257A5.475 5.475 0 0 0 11.462 16c.902 0 1.752-.217 2.502-.6l.174-.09l2.86.801l-.969-2.536l.128-.21c.51-.834.805-1.814.805-2.865a5.474 5.474 0 0 0-.964-3.11a7.5 7.5 0 0 0-.235-1.763a6.484 6.484 0 0 1 2.199 4.873c0 1.151-.3 2.233-.825 3.172l.795 2.082a1 1 0 0 1-1.203 1.32l-2.488-.697c-.843.4-1.786.623-2.78.623Z'
        ></path>
      </svg>
    )
  },
  {
    name: 'Cấp số',
    to: '/number/number-list',
    icon: (
      <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 256 256'>
        <g fill='currentColor'>
          <path d='m220 169.09l-92 53.65l-92-53.65a8 8 0 0 0-8 13.82l96 56a8 8 0 0 0 8.06 0l96-56a8 8 0 1 0-8.06-13.82Z'></path>
          <path d='m220 121.09l-92 53.65l-92-53.65a8 8 0 0 0-8 13.82l96 56a8 8 0 0 0 8.06 0l96-56a8 8 0 1 0-8.06-13.82Z'></path>
          <path d='m28 86.91l96 56a8 8 0 0 0 8.06 0l96-56a8 8 0 0 0 0-13.82l-96-56a8 8 0 0 0-8.06 0l-96 56a8 8 0 0 0 0 13.82Z'></path>
        </g>
      </svg>
    )
  },
  {
    name: 'Báo cáo',
    to: '/report/report-list',
    icon: (
      <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
        <g fill='currentColor'>
          <path d='M6 22a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h8.172a3 3 0 0 1 2.12.879l3.83 3.828A3 3 0 0 1 21 8.828V19a3 3 0 0 1-3 3H6zm-1-3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9h-3a3 3 0 0 1-3-3V4H6a1 1 0 0 0-1 1v14zM16 8h2.586L15 4.414V7a1 1 0 0 0 1 1zm0 5a1 1 0 1 0-2 0v4a1 1 0 1 0 2 0v-4zm-3 2a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2zm-4 1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H9z'></path>
        </g>
      </svg>
    )
  }
]
export const settingNav = [
  {
    name: 'Quản lý vai trò',
    to: '/setting/role-manegement'
  },
  {
    name: 'Quản lý tài khoản',
    to: '/setting/account-manegement'
  },
  {
    name: 'Quản lý người dùng',
    to: '/setting/user-diary'
  }
]

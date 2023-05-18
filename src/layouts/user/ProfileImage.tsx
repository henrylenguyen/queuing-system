import React from 'react'

type Props = {}

const ProfileImage = (props: Props) => {
  return (
    <div className='flex flex-shrink-0 flex-col items-center gap-10'>
      <div className='relative'>
        <img
          src='https://i.pinimg.com/originals/48/ef/76/48ef764d8ce6b93fdf27628cc9e86e2f.jpg'
          alt='avatar'
          className='h-[250px] w-[250px] rounded-full object-cover'
        />
        <button
          className='absolute bottom-[2%] right-[10%] flex h-[40px] w-[40px] items-center justify-center
            rounded-full border-2 border-white bg-[#FF7506] text-white'
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
              d='M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z'
            />
          </svg>
        </button>
      </div>

      <span className='text-[30px] font-semibold text-[#282739]'>Lê Nguyễn Phương Thái</span>
    </div>
  )
}

export default ProfileImage
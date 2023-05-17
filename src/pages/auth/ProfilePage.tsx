import React from 'react'
import Badge from '@mui/material/Badge'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import { Avatar } from 'antd'
import ProfileLayout from 'layouts/user/ProfileLayout'
type Props = {}

const ProfilePage = (props: Props) => {
  return (
    <div className='w-full p-10'>
      <div className='flex w-full items-center justify-between'>
        <h3 className='text-[20px] font-bold text-primary'>Thông tin cá nhân</h3>
        <div className='flex gap-5'>
          <button className='rounded-full bg-[#FFF2E7] p-2'>
            <Badge badgeContent={4} color='primary'>
              <NotificationsActiveIcon sx={{ color: '#FFAC6A' }} fontSize='medium' />
            </Badge>
          </button>
          <div className='flex gap-4'>
            <Avatar src='https://i.pinimg.com/originals/48/ef/76/48ef764d8ce6b93fdf27628cc9e86e2f.jpg' size='large' />
            <div className='flex flex-col gap-2'>
              <span className='text-[13px] font-semibold text-gray-500'>Xin chào</span>
              <span className='font-semibold'>Lê Nguyễn Phương Thái</span>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-32'>
        <ProfileLayout />
      </div>
    </div>
  )
}

export default ProfilePage

import React from 'react'

import ProfileLayout from 'layouts/user/ProfileLayout'
import PageInfor from 'components/pageInfor/PageInfor'
type Props = {}

const ProfilePage = (props: Props) => {
  return (
    <div className='w-full p-10'>
      <PageInfor title='Thông tin cá nhân' />
      <div className='mt-32'>
        <ProfileLayout />
      </div>
    </div>
  )
}

export default ProfilePage

import React from 'react'
import ProfileLayout from 'layouts/user/ProfileLayout'
import PageInfor from 'components/pageInfor/PageInfor'
type Props = {}

const ProfilePage = (props: Props) => {
  return (
    <div className='w-full p-10'>
      <PageInfor />
      <div className='max-[1440px]:pt-6 min-[1500px]:pt-32'>
        <ProfileLayout />
      </div>
    </div>
  )
}

export default ProfilePage

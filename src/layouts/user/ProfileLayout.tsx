import React from 'react'
import Form from 'components/form/Form'
import { LoginShema } from 'schemas/Login.schema'
import { IFields } from 'constants/interface/formInterface'

type Props = {}

const ProfileLayout = (props: Props) => {
  const profileFields: IFields[] = [
    {
      label: 'Mật khẩu',
      name: 'password',
      type: 'password',
      placeholder: '*****',
      className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
      classNameDiv: 'col-span-2 w-full h-full'
    },

    {
      label: 'Nhập lại mật khẩu',
      name: 'rePassword',
      type: 'password',
      placeholder: '*****',
      className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
      classNameDiv: 'col-span-2 w-full h-full'
    }
  ]

  return (
    <div className='h-[500px] w-full rounded-2xl bg-white px-6 py-10'>
      <div className='flex'>
        <div className='flex flex-shrink-0 flex-col items-center gap-5'>
          <img
            src='https://i.pinimg.com/originals/48/ef/76/48ef764d8ce6b93fdf27628cc9e86e2f.jpg'
            alt='avatar'
            className='h-[250px] w-[250px] rounded-full object-cover'
          />
          <span className='text-[30px] font-semibold text-[#282739]'>Lê Nguyễn Phương Thái</span>
        </div>
        <div className='w-full'>
          <Form schema={LoginShema} fields={profileFields} gap='30px'/>
        </div>
      </div>
    </div>
  )
}

export default ProfileLayout

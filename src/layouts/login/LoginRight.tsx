import React from 'react'

type Props = {
  src: string
}

const LoginRight = ({ src }: Props) => {
  return (
    <div className='flex items-center  justify-center px-5'>
      <div className='w-full '>
        <img src={src} alt='ảnh' className='w-full object-cover' />
      </div>
    </div>
  )
}

export default LoginRight

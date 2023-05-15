import React from 'react'
import LoginLeft from './LoginLeft'
import LoginRight from './LoginRight'

type Props = {
  children?: React.ReactNode
  src: string
}

const LoginLayout = ({ children, src }: Props) => {
  return (
    <div className='flex'>
      <LoginLeft>{children}</LoginLeft>
      <LoginRight src={src} />
    </div>
  )
}

export default LoginLayout

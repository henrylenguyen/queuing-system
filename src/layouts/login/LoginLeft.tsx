import React from 'react'
import logo from 'assets/images/Logo-alta.svg'

type Props = {
  children: React.ReactNode
}

const LoginLeft = ({ children }: Props) => {
  return (
    <div className='flex h-screen w-[50%] flex-col items-center bg-secondary p-20'>
      <div className='w-full'>
        <img src={logo} alt='logo alta' className='mx-auto' />
        <div className='flex min-h-[500px] w-full items-center'>{children}</div>
      </div>
    </div>
  )
}

export default LoginLeft

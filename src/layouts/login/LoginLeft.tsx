import React from 'react'
import logo from 'assets/images/Logo-alta.svg'

type Props = {
  children: React.ReactNode
}

const LoginLeft = ({ children }: Props) => {
  return (
    <div className='flex h-screen w-[40%] flex-shrink-0 flex-col items-center overflow-hidden bg-secondary p-20'>
      <div className='w-full'>
        <img src={logo} alt='logo alta' className='mx-auto' />
        <div className='flex min-h-[500px] w-full flex-col items-center justify-center'>{children}</div>
      </div>
    </div>
  )
}

export default LoginLeft

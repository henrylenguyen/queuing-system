import Navbar from 'components/navbar/Navbar'
import React from 'react'
type Props = {
  children?: React.ReactNode
}

const DashBoardLayout = ({ children }: Props) => {
  return (
    <div className='flex '>
      <Navbar />
      {children}
    </div>
  )
}

export default DashBoardLayout

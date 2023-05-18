import React from 'react'
import soDaCap from 'assets/images/soDaCap.svg'
import soDaSuDung from 'assets/images/soDaSuDung.svg'

type Props = {}
const NumberChart = (props: Props) => {
  return (
    <div className='flex h-[150px] flex-col gap-5 rounded-lg bg-white p-5'>
      <div className='flex items-center gap-5'>
        <div className='h-[50px] w-[50px] rounded-full bg-[#E8EFFE] p-3'>
          <img src={soDaCap} alt='soDaCap' />
        </div>
        <span className='text-[20px] font-bold text-[#535261]'>Số thứ tự đã cấp</span>
      </div>
      <div className='flex items-center justify-between gap-5'>
        <span className='text-[35px] font-bold text-[#535261]'>4.221</span>
        <div className='increase flex w-[100px] items-center gap-2 rounded-2xl bg-[#FFEFD9] px-2 text-[#FF9D4C]'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='icon icon-tabler icon-tabler-arrow-up'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            stroke-width='2'
            stroke='currentColor'
            fill='none'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
            <path d='M12 5l0 14'></path>
            <path d='M18 11l-6 -6'></path>
            <path d='M6 11l6 -6'></path>
          </svg>
          <span>32.41%</span>
        </div>
      </div>
    </div>
  )
}

export default NumberChart

import soDaBoQua from 'assets/images/soDaBoQua.svg'
import soDaCap from 'assets/images/soDaCap.svg'
import soDaSuDung from 'assets/images/soDaSuDung.svg'
import soDangCho from 'assets/images/soDangCho.svg'
type Props = {
  title: string
  amountInMonth: number
  statistical: string
  increase: boolean
}
const NumberChart = ({ title, amountInMonth, statistical, increase }: Props) => {
  const ParseamountInMonth = amountInMonth.toLocaleString('vi-VN')
  return (
    <div className='number-chart flex h-[150px] flex-col justify-around rounded-lg bg-white px-5 py-5 max-[1440px]:px-3'>
      <div className='flex items-center gap-5'>
        <>
          {title.toLowerCase() === 'số thứ tự đã cấp' ? (
            <div className='h-[50px] w-[50px] flex-shrink-0 rounded-full  bg-[#E8EFFE] p-3 max-[1440px]:h-[35px] max-[1440px]:w-[35px]'>
              <img src={soDaCap} alt='soDaCap' />
            </div>
          ) : title.toLowerCase() === 'số thứ tự đã sử dụng' ? (
            <div className='h-[50px] w-[50px] flex-shrink-0 rounded-full bg-[#E1F7E6] p-3 max-[1440px]:h-[35px] max-[1440px]:w-[35px]'>
              <img src={soDaSuDung} alt='soDaSuDung' />
            </div>
          ) : title.toLowerCase() === 'số thứ tự đang chờ' ? (
            <div className='h-[50px] w-[50px] flex-shrink-0 rounded-full bg-[#FFF3E9] p-3 max-[1440px]:h-[35px] max-[1440px]:w-[35px]'>
              <img src={soDangCho} alt='soDangCho' />
            </div>
          ) : (
            <div className='h-[50px] w-[50px] flex-shrink-0 rounded-full bg-[#FEE9E9] p-3 max-[1440px]:h-[35px] max-[1440px]:w-[35px]'>
              <img src={soDaBoQua} alt='soDaBoQua' />
            </div>
          )}
        </>
        <span className='text-[20px] font-bold text-[#535261] max-[1440px]:text-[16px]'>{title}</span>
      </div>
      <div className='flex items-center justify-between'>
        <span className='text-[35px] font-bold text-[#535261] max-[1440px]:text-[25px]'>{ParseamountInMonth}</span>
        {increase ? (
          <div className='increase  flex w-[100px]  flex-shrink-0 items-center gap-2 rounded-2xl bg-[#FFEFD9] p-2 text-[#FF9D4C] max-[1440px]:w-[80px] max-[1440px]:py-1 max-[1440px]:text-[13px]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='icon icon-tabler icon-tabler-arrow-up flex-shrink-0  max-[1440px]:w-[13px]'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              strokeWidth='2'
              stroke='currentColor'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
              <path d='M12 5l0 14'></path>
              <path d='M18 11l-6 -6'></path>
              <path d='M6 11l6 -6'></path>
            </svg>
            <span>{statistical}</span>
          </div>
        ) : (
          <div className='decrease flex w-[100px] flex-shrink-0 items-center gap-2 rounded-2xl bg-[#FBE2E2] p-2 text-red-400 max-[1440px]:w-[80px] max-[1440px]:py-1 max-[1440px]:text-[13px]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='icon icon-tabler icon-tabler-arrow-down flex-shrink-0 max-[1440px]:w-[13px]'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              strokeWidth='2'
              stroke='currentColor'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
              <path d='M12 5l0 14'></path>
              <path d='M18 13l-6 6'></path>
              <path d='M6 13l6 6'></path>
            </svg>
            <span>{statistical}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default NumberChart

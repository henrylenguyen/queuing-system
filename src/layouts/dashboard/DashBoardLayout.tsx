import Loading from 'components/loading/Loading'
import Navbar from 'components/navbar/Navbar'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchUserLogin } from 'redux/action/users/auth.action'
import { changeStateNav } from 'redux/slice/nav.slice'
import { useLocalStorage } from 'usehooks-ts'
import { AppDispatch, RootState } from '../../redux/store'
import bgError from 'assets/images/error.png'
type Props = {
  children?: React.ReactNode
}

const DashBoardLayout = ({ children }: Props) => {
  const { isActive } = useSelector((state: RootState) => state.navbar)
  const { isLoading } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()
  const [isLogin] = useLocalStorage('islogin', { islogin: false, id: null })
  const navigate = useNavigate()
  useEffect(() => {
    if (!isLogin.islogin) {
      navigate('/login')
    }
  }, [isLogin, navigate])
  useEffect(() => {
    if (isLogin?.id) {
      dispatch(fetchUserLogin(isLogin.id))
    }
  }, [])

  return (
    <>
      {isLogin.islogin &&
        (isLoading ? (
          <Loading />
        ) : (
          <>
            <div className='relative flex h-[100vh] items-center justify-center bg-primary xl:hidden'>
              <img src={bgError} alt='background' className='h-[600px] object-cover md:h-full xl:h-full' />
              <h2 className='absolute inline-block rounded-xl bg-red-600 p-5 text-center text-[18px] font-bold uppercase text-white'>
                Chúng tôi hiện chưa hỗ trợ trên thiết bị này!
              </h2>
            </div>
            <div className='hidden h-auto xl:flex'>
              <Navbar />
              <div className={`relative ${isActive ? 'w-[97%]' : 'w-[85%]'}`}>
                {children}
                <button
                  className='absolute top-0 bg-primary text-white'
                  onClick={() => dispatch(changeStateNav(!isActive))}
                >
                  {isActive ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-6 w-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5'
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-6 w-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5'
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </>
        ))}
    </>
  )
}

export default DashBoardLayout

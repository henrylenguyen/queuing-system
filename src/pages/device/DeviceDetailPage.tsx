import Loading from 'components/loading/Loading'
import PageInfor from 'components/pageInfor/PageInfor'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import { fetchDeviceDetail } from 'redux/action/devices/deviceDetail.action'
import { AppDispatch, RootState } from 'redux/store'

type Props = {}

const DeviceDetailPage = (props: Props) => {
  const { deviceDetail } = useSelector((state: RootState) => state.device)

  const dispatch = useDispatch<AppDispatch>()
  // dùng useLocation để lấy ra id sau dấu ?
  const location = useLocation().search
  // tách lấy id
  const path = location.split('?')[1]
  useEffect(() => {
    dispatch(fetchDeviceDetail(path))
  }, [dispatch, path])

  return (
    <>
      {deviceDetail.id ? (
        <div className='pt-10 '>
          <PageInfor />
          <div className='flex h-full pl-10 pt-14  max-[1440px]:pl-5'>
            <div className=' flex w-full  flex-col justify-between overflow-hidden'>
              <div>
                <h3 className='text-[25px] font-semibold text-primary min-[1500px]:text-[30px]'>Quản lý thiết bị</h3>
                <div className='mt-10 h-[500px] w-full rounded-xl bg-white p-5'>
                  <h3 className='text-[20px] font-semibold text-primary min-[1500px]:text-[25px]'>
                    Thông tin thiết bị
                  </h3>
                  <div className='mt-10 grid w-full grid-cols-2 gap-y-10'>
                    <div className='grid grid-cols-3 '>
                      <h4 className=' font-bold text-[#282739]'>Mã thiết bị:</h4>
                      <span className='whitespace-nowrap text-[#535261]'>{String(deviceDetail.maThietBi)}</span>
                    </div>
                    <div className='grid grid-cols-3'>
                      <h4 className='font-bold text-[#282739]'>Loại thiết bị:</h4>
                      <span className='text-[#535261]'>{String(deviceDetail.loaiThietBi)}</span>
                    </div>
                    <div className='grid grid-cols-3'>
                      <h4 className='font-bold text-[#282739]'>Tên thiết bị:</h4>
                      <span className='text-[#535261]'>{String(deviceDetail.tenThietBi)}</span>
                    </div>
                    <div className='grid grid-cols-3'>
                      <h4 className='font-bold text-[#282739]'>Tên đăng nhập:</h4>
                      <span className='text-[#535261]'>{String(deviceDetail.taiKhoan)}</span>
                    </div>
                    <div className='grid grid-cols-3'>
                      <h4 className='font-bold text-[#282739]'>Địa chỉ IP:</h4>
                      <span className='text-[#535261]'>{String(deviceDetail.diaChiIP)}</span>
                    </div>
                    <div className='grid grid-cols-3'>
                      <h4 className='font-bold text-[#282739]'>Mật khẩu:</h4>
                      <span className='text-[#535261]'>{String(deviceDetail.matKhau)}</span>
                    </div>
                    <div className='grid grid-cols-3'>
                      <h4 className='font-bold text-[#282739]'>Dịch vụ sử dụng:</h4>
                      <span className='whitespace-nowrap text-[#535261]'>
                        {[...deviceDetail.dichVuSuDung].map((item) => item).join(', ')}
                      </span>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
            <div className=' flex-shink-0 flex h-[250px] items-end p-5'>
              <NavLink
                to={`/device/device-list/update-device?${deviceDetail.id}`}
                className={'flex flex-col items-center gap-2 rounded-lg bg-[#FFF2E7] p-5 text-primary shadow'}
              >
                <div className='flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='#fff'
                    className='h-6 w-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z'
                    />
                  </svg>
                </div>
                <span className='text-center'>Cập nhật thiết bị</span>
              </NavLink>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default DeviceDetailPage

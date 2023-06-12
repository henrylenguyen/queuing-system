import { message } from 'antd'
import Loading from 'components/loading/Loading'
import PageInfor from 'components/pageInfor/PageInfor'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { fetchNumberDetail, updateNumber } from 'redux/action/numbers/numberDetail.action'
import { clearStatusUpdate } from 'redux/slice/number.slice'
import { AppDispatch, RootState } from 'redux/store'

type Props = {}

const NumberDetailPage = (props: Props) => {
  const { numberDetail, updateNumberDetail } = useSelector((state: RootState) => state.number)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  // dùng useLocation để lấy ra id sau dấu ?
  const location = useLocation().search
  // tách lấy id
  const path = location.split('?')[1]
  useEffect(() => {
    dispatch(fetchNumberDetail(path))
  }, [dispatch, path])
  useEffect(() => {
    if (updateNumberDetail) {
      message.success('Cập nhật trạng thái thành công', 2).then(() => {
        dispatch(clearStatusUpdate())
        navigate('/number/number-list')
      })
    }
  }, [updateNumberDetail])

  const dataDetail = useCallback(() => {
    return [
      {
        title: 'Họ tên',
        name: 'tenKhachHang',
        data: numberDetail.tenKhachHang
      },
      {
        title: 'Tên dịch vụ',
        name: 'tenDichVu',
        data: numberDetail.tenDichVu
      },
      {
        title: 'Số thứ tự',
        name: 'STT',
        data: numberDetail.STT.toString()
      },
      {
        title: 'Thời gian cấp',
        name: 'thoiGianCap',
        data: numberDetail.thoiGianCap
      },
      {
        title: 'Hạn sử dụng',
        name: 'hanSuDung',
        data: numberDetail.hanSuDung
      },
      {
        title: 'Nguồn cấp',
        name: 'nguonCap',
        data: numberDetail.nguonCap
      },
      {
        title: 'Trạng thái',
        name: 'trangThai',
        data:
          numberDetail.trangThai === 'pending'
            ? 'Đang chờ'
            : numberDetail.trangThai === 'used'
            ? 'Đã sử dụng'
            : 'Bỏ qua'
      },
      {
        title: 'Số điện thoại',
        name: 'soDienThoai',
        data: numberDetail.soDienThoai
      },
      {
        title: 'Địa chỉ Email',
        name: 'email',
        data: numberDetail.email
      }
    ]
  }, [numberDetail])
  const data = dataDetail()
  const options = [
    {
      value: 'pending',
      label: 'Đang chờ'
    },
    {
      value: 'used',
      label: 'Đã sử dụng'
    },
    {
      value: 'skipped',
      label: 'Bỏ qua'
    }
  ]
  const handleChange = (data: any) => {
    dispatch(updateNumber({ id: path, trangThai: data.value }))
  }
  return (
    <>
      {numberDetail.id ? (
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
                    {data.map((item) => (
                      <div key={item.name} className='grid grid-cols-3 items-center'>
                        <h4 className='font-bold text-[#282739]'>{`${item.title}:`}</h4>
                        {item.data === 'Đang chờ' || item.data === 'Đã sử dụng' || item.data === 'Bỏ qua' ? (
                          <Select
                            options={options}
                            defaultValue={options.find((option) => option.label === item.data)}
                            styles={{
                              control: (base) => ({
                                ...base,
                                border: '0px',
                                boxShadow: 'none',
                                padding: 2,
                                cursor: 'pointer'
                              })
                            }}
                            onChange={handleChange}
                          />
                        ) : (
                          <span className='text-[#535261]'>{item.data}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div></div>
              </div>
            </div>
            <div className=' flex-shink-0 flex h-[250px] items-end p-5'>
              <NavLink
                to={`/number/number-list`}
                className={
                  'flex h-[80px] w-[150px] flex-col items-center gap-2 rounded-lg bg-[#FFF2E7] py-5 text-primary shadow'
                }
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
                    <path strokeLinecap='round' strokeLinejoin='round' d='M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3' />
                  </svg>
                </div>
                <span className='text-center'>Quay lại</span>
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

export default NumberDetailPage

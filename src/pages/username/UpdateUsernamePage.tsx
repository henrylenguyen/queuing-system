import { message } from 'antd'
import Form from 'components/form/Form'
import PageInfor from 'components/pageInfor/PageInfor'
import { UsernameShema } from 'constants/schemas/Username.schema'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchRolesName } from 'redux/action/roles/roleList.action'
import { addUser, fetchUserDetail } from 'redux/action/users/users.action'
import { clearStatus } from 'redux/slice/userSlice'
import { AppDispatch, RootState } from 'redux/store'
import { IFields } from '../../constants/interface/formInterface'
import Loading from 'components/loading/Loading'

type Props = {}

const UpdateUsernamePage = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const { addUserSuccess, userDetail } = useSelector((state: RootState) => state.user)
  const { roleName } = useSelector((state: RootState) => state.role)
  const navigate = useNavigate()
  // dùng useLocation để lấy ra id sau dấu ?
  const location = useLocation().search
  // tách lấy id
  const path = location.split('?')[1]
  useEffect(() => {
    dispatch(fetchRolesName())
    dispatch(fetchUserDetail(path))
  }, [])

  useEffect(() => {
    if (addUserSuccess.success) {
      message.success(`${addUserSuccess.message}`, 2).then(() => {
        navigate('/account/account-list')
      })
    } else if (!addUserSuccess.success && addUserSuccess.message !== '') {
      message.error(`${addUserSuccess.message}`, 2)
    }
  }, [addUserSuccess])
  const handleSubmit = (data: any) => {
    const { nhapLaiMatKhau, ...newData } = data
    dispatch(addUser(newData)).then(() => {
      dispatch(clearStatus())
    })
  }

  const RoleNameOfUsers = useCallback(() => {
    const newUserRole = roleName?.map((user) => {
      return {
        value: user.tenVaiTro,
        label: user.tenVaiTro
      }
    })
    return newUserRole
  }, [roleName])
  const roleNameOfUsers = RoleNameOfUsers()

  const getUsernameFields = useCallback((): IFields[] => {
    return [
      {
        label: 'Họ tên *',
        name: 'hoTen',
        type: 'text',
        placeholder: 'abc',
        className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
        classNameDiv: 'col-span-2 w-full h-full'
      },
      {
        label: 'Tên đăng nhập *',
        name: 'taiKhoan',
        type: 'text',
        placeholder: 'abc',
        className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
        classNameDiv: 'col-span-2 w-full h-full'
      },
      {
        label: 'Số điện thoại *',
        name: 'soDienThoai',
        type: 'tel',
        placeholder: '0123456789',
        className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
        classNameDiv: 'col-span-2 w-full h-full'
      },
      {
        label: 'Mật khẩu *',
        name: 'matKhau',
        type: 'password',
        placeholder: '***********',
        className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
        classNameDiv: 'col-span-2 w-full h-full'
      },
      {
        label: 'Email *',
        name: 'email',
        type: 'email',
        placeholder: 'example@abc.com',
        className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
        classNameDiv: 'col-span-2 w-full h-full'
      },
      {
        label: 'Nhập lại mật khẩu *',
        name: 'nhapLaiMatKhau',
        type: 'password',
        placeholder: '***********',
        className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
        classNameDiv: 'col-span-2 w-full h-full'
      },
      {
        label: 'Vai trò *',
        name: 'vaiTro',
        type: 'select',
        options: roleNameOfUsers,
        placeholder: 'Kế toán',
        className: 'bg-white w-full border border-[#D4D4D7] rounded-md ',
        classNameDiv: 'col-span-2 w-full h-full'
      },
      {
        label: 'Tình trạng *',
        name: 'trangThaiHoatDong',
        type: 'select',
        options: [
          {
            label: 'Hoạt động',
            value: 'Hoạt động'
          },
          {
            label: 'Ngưng hoạt động',
            value: 'Ngưng hoạt động'
          }
        ],
        placeholder: 'Chọn tình trạng',
        className: 'bg-white w-full border border-[#D4D4D7] rounded-md ',
        classNameDiv: 'col-span-2 w-full h-full'
      }
    ]
  }, [roleNameOfUsers])

  const usernameFields = getUsernameFields()
  return (
    <>
      {userDetail.id ? (
        <div className='pt-10 '>
          <PageInfor />
          <div className='flex h-full px-10 pt-14  max-[1440px]:px-5'>
            <div className=' flex flex-grow flex-col justify-between overflow-hidden'>
              <div className='w-full'>
                <h3 className='text-[25px] font-semibold text-primary min-[1500px]:text-[30px]'>Quản lý thiết bị</h3>
                <div className='my-10 w-full rounded-xl bg-white p-5'>
                  <Form
                    schema={UsernameShema}
                    fields={usernameFields}
                    title='Thông tin thiết bị'
                    gap='30px'
                    titleButtonCancel='Hủy bỏ'
                    titleButton='Thêm tài khoản'
                    handleSubmitForm={handleSubmit}
                    to='/account/account-list'
                    initialValues={userDetail}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading/>
      )}
    </>
  )
}

export default UpdateUsernamePage

import { IFields } from 'constants/interface/formInterface'

const usernameFields: IFields[] = [
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
    options: [
      {
        label: 'Kế toán',
        value: 'accountant'
      },
      {
        label: 'Quản lý',
        value: 'manage'
      },
      {
        label: 'Admin',
        value: 'admin'
      }
    ],
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
        value: 'active'
      },
      {
        label: 'Ngưng hoạt động',
        value: 'inactive'
      }
    ],
    placeholder: 'Chọn tình trạng',
    className: 'bg-white w-full border border-[#D4D4D7] rounded-md ',
    classNameDiv: 'col-span-2 w-full h-full'
  }
]
export default usernameFields

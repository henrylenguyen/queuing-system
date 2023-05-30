import { IFields } from 'constants/interface/formInterface'

const profileFields: IFields[] = [
  {
    label: 'Tên người dùng',
    name: 'hoTen',
    type: 'text',
    placeholder: 'abc',
    className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
    classNameDiv: 'col-span-2 w-full h-full',
    readOnly: true
  },

  {
    label: 'Tên đăng nhập',
    name: 'taiKhoan',
    type: 'text',
    placeholder: 'abc',
    className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
    classNameDiv: 'col-span-2 w-full h-full',
    readOnly: true
  },
  {
    label: 'Số điện thoại',
    name: 'soDienThoai',
    type: 'tel',
    placeholder: '0123456789',
    className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
    classNameDiv: 'col-span-2 w-full h-full',
    readOnly: true
  },
  {
    label: 'Mật khẩu',
    name: 'matKhau',
    type: 'password',
    placeholder: '***********',
    className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
    classNameDiv: 'col-span-2 w-full h-full',
    readOnly: true
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    placeholder: 'example@abc.com',
    className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
    classNameDiv: 'col-span-2 w-full h-full',
    readOnly: true
  },
  {
    label: 'Vai trò',
    name: 'vaiTro',
    type: 'text',
    placeholder: 'Kế toán',
    className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
    classNameDiv: 'col-span-2 w-full h-full',
    readOnly: true
  }
]
export default profileFields

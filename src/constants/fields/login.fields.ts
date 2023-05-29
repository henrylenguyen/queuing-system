import { IFields } from 'constants/interface/formInterface'

export const loginField: IFields[] = [
  {
    name: 'taiKhoan',
    type: 'text',
    placeholder: 'abc',
    label: 'Tên đăng nhập *',
    className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
    classNameDiv: 'col-span-4 w-full h-full'
  },
  {
    name: 'matKhau',
    type: 'password',
    placeholder: '*****',
    label: 'Mật khẩu *',
    className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
    classNameDiv: 'col-span-4 w-full h-full'
  }
]
export const resetPassField: IFields[] = [
  {
    label: 'Vui lòng nhập email để đặt lại mật khẩu của bạn *',
    name: 'email',
    type: 'email',
    placeholder: 'example@abc.com',
    className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
    classNameDiv: 'col-span-4 w-full h-full'
  }
]
export const newPassField: IFields[] = [
  {
    label: 'Mật khẩu',
    name: 'password',
    type: 'password',
    placeholder: '*****',
    className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
    classNameDiv: 'col-span-4 w-full h-full'
  },

  {
    label: 'Nhập lại mật khẩu',
    name: 'rePassword',
    type: 'password',
    placeholder: '*****',
    className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
    classNameDiv: 'col-span-4 w-full h-full'
  }
]

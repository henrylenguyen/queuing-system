import { IFields } from 'constants/interface/formInterface'

export const loginField: IFields[] = [
  {
    name: 'username',
    type: 'text',
    placeholder: 'abc',
    label: 'Tên đăng nhập *',
    className:
      'bg-white w-full border border-[#D4D4D7] p-2 rounded-md focus:ring-2 focus:ring-inset focus:ring-orange-400',
    classNameDiv: 'col-span-3 w-full h-full'
  },
  {
    name: 'password',
    type: 'password',
    placeholder: '*****',
    label: 'Mật khẩu *',
    className:
      'bg-white w-full border border-[#D4D4D7] p-2 rounded-md focus:ring-2 focus:ring-inset focus:ring-orange-400',
    classNameDiv: 'col-span-3 w-full h-full'
  }
]

import { IFields } from 'constants/interface/formInterface'

export const deviceField: IFields[] = [
  {
    name: 'maThietBi',
    type: 'text',
    placeholder: 'Nhập mã thiết bị',
    label: 'Mã thiết bị *',
    className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
    classNameDiv: 'col-span-2 w-full h-full'
  },
  {
    name: 'loaiThietBi',
    type: 'select',
    options: [
      {
        value: 'kiosk',
        label: 'Kiosk'
      },
      {
        value: 'display',
        label: 'Display counter'
      }
    ],
    placeholder: 'Chọn loại thiết bị',
    label: 'Loại thiết bị *',
    className: 'bg-white w-full border border-[#D4D4D7] rounded-md ',
    classNameDiv: 'col-span-2 w-full h-full'
  },
  {
    name: 'tenThietBi',
    type: 'text',
    placeholder: 'Nhập tên thiết bị',
    label: 'Tên thiết bị *',
    className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
    classNameDiv: 'col-span-2 w-full h-full'
  },
  {
    name: 'taiKhoan',
    type: 'text',
    placeholder: 'Nhập tài khoản',
    label: 'Tên đăng nhập *',
    className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
    classNameDiv: 'col-span-2 w-full h-full'
  },
  {
    name: 'diaChiIP',
    type: 'text',
    placeholder: 'Nhập địa chỉ IP',
    label: 'Địa chỉ IP *',
    className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
    classNameDiv: 'col-span-2 w-full h-full'
  },
  {
    name: 'matKhau',
    type: 'password',
    placeholder: 'Nhập mật khẩu',
    label: 'Mật khẩu *',
    className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
    classNameDiv: 'col-span-2 w-full h-full'
  },
  {
    name: 'dichVuSuDung',
    type: 'text',
    placeholder: 'Nhập dịch vụ sử dụng',
    label: 'Dịch vụ sử dụng *',
    className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
    classNameDiv: 'col-span-4 w-full h-full'
  }
]

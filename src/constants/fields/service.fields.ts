import { IFields } from 'constants/interface/formInterface'

export const serviceField: IFields[] = [
  {
    name: 'maDichVu',
    type: 'text',
    placeholder: '201',
    label: 'Mã dịch vụ: *',
    className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
    classNameDiv: 'col-span-2 w-full h-full'
  },
  {
    name: 'moTa',
    type: 'textarea',
    placeholder: 'Mô tả dịch vụ',
    label: 'Mô tả:',
    className: 'bg-white w-full border border-[#D4D4D7] rounded-md ',
    classNameDiv: 'col-span-2 w-full h-full row-span-2'
  },
  {
    name: 'tenDichVu',
    type: 'text',
    placeholder: 'Khám tim mạch',
    label: 'Tên dịch vụ *',
    className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
    classNameDiv: 'col-span-2 w-full h-full'
  }
]

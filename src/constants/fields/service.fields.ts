import { IFields } from "constants/interface/formInterface";
export const serviceFields: IFields[] = [
  {
    name: 'maDichVu',
    type: 'text',
    placeholder: '201',
    label: 'Mã dịch vụ: *',
    className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
    classNameDiv: 'col-span-2 w-full h-full',
    readOnly: true
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
  },
  {
    name: 'quyTacCapSo',
    type: 'checkbox',
    placeholder: '',
    options: [
      {
        label: 'Tăng tự động từ:',
        value: {
          name: 'autoIncrement',
          data: ['0001', '9999']
        },
        input: true,
        numberOfInput: 2
      },
      {
        label: 'Prefix',
        value: {
          name: 'prefix',
          data: '0001'
        },
        input: true,
        numberOfInput: 1
      },
      {
        label: 'Surfix',
        value: {
          name: 'surfix',
          data: '0001'
        },
        input: true,
        numberOfInput: 1
      },
      {
        label: 'Reset mỗi ngày',
        value: {
          name: 'reset',
          data: true
        }
      }
    ],
    label: 'Quy tắc cấp số',
    className: 'bg-white w-full border border-[#D4D4D7] p-2 rounded-md ',
    classNameDiv: 'col-span-2 w-full h-full'
  }
]
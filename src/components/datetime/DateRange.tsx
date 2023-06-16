import { DatePicker, ConfigProvider } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/vi' // Import Vietnamese locale
import locale from 'antd/lib/locale/vi_VN' // Import Vietnamese Ant Design locale
import React, { useState } from 'react'
import {
RightOutlined,LeftOutlined,RightCircleOutlined,CaretRightOutlined,CaretLeftOutlined,ArrowRightOutlined,CalendarOutlined
} from '@ant-design/icons';
const { RangePicker } = DatePicker

interface DateRangePickerProps {
  handleChange: (dates: any, dateStrings: any) => void
  placeholder?: [string, string]
  className?: string
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ handleChange, placeholder, className }) => {
  const [selectedDate, setSelectedDate] = useState<[Dayjs | null, Dayjs | null]>([null, null])

  const handleDateChange = (dates: any, dateStrings: any) => {
    setSelectedDate(dates)
    handleChange(dates, dateStrings) // Call the parent handleChange function
  }

  const disabledDate = (current: Dayjs) => {
    return current && current < dayjs().startOf('day') // Disable past dates
  }

  return (
    <ConfigProvider locale={locale}>
      <RangePicker
      nextIcon={<RightOutlined className='text-primary'/>}
      prevIcon={<LeftOutlined className='text-primary'/>}
      superNextIcon={
      <CaretRightOutlined className='text-primary text-[18px]'/>
      }
      suffixIcon={<CalendarOutlined className='text-primary text-[18px]'/>}
      separator={<ArrowRightOutlined className='text-primary text-[18px]'/>}
      superPrevIcon={<CaretLeftOutlined className='text-primary text-[18px]'/>}
        placeholder={placeholder || ['Ngày bắt đầu', 'Ngày kết thúc']}
        className={`${className} custom-date-picker` || 'h-[38px] '}
        defaultValue={[dayjs(), dayjs()]} // Set default value to current date
        value={selectedDate} // Controlled value
        onChange={handleDateChange} // Pass the handleDateChange function
        format='DD/MM/YYYY' // Set the date format to "dd/mm/yyyy"
        cellRender={(current) => {
        const style: React.CSSProperties = {
        };
        
        return (
          <div className="ant-picker-cell-inner" style={style}>
            {current.date()}
          </div>
        );
      }}
      
  
      />
    </ConfigProvider>
  )
}

export default DateRangePicker

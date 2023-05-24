import { DatePicker, ConfigProvider } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/vi' // Import Vietnamese locale
import locale from 'antd/lib/locale/vi_VN' // Import Vietnamese Ant Design locale
import React, { useState } from 'react'

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
        placeholder={placeholder || ['Ngày bắt đầu', 'Ngày kết thúc']}
        className={className || 'h-[38px]'}
        defaultValue={[dayjs(), dayjs()]} // Set default value to current date
        value={selectedDate} // Controlled value
        onChange={handleDateChange} // Pass the handleDateChange function
        disabledDate={disabledDate} // Disable past dates
      />
    </ConfigProvider>
  )
}

export default DateRangePicker

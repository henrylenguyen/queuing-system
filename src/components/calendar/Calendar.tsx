import * as React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'

export default function Calendar() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        className='custom-calendar'
        sx={{
          boxShadow: '2px 2px 15px rgba(70, 64, 67, 0.1)',
          width: '100%',
          color: '#FF7506'
        }}
        dayOfWeekFormatter={(day) => `${day}`}
      />
    </LocalizationProvider>
  )
}

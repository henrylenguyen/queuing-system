import { useState } from 'react'
import { FormControlLabel, Checkbox } from '@mui/material'
import { useController } from 'react-hook-form'
import { orange } from '@mui/material/colors'

const CheckboxGroup = ({ options, control, name, ...props }) => {
  const { field } = useController({
    control,
    name
  })

  const [checkedValues, setCheckedValues] = useState(() => {
    return options.filter((option) => option.checked).map((option) => option.value)
  })

  const handleCheckboxChange = (value) => {
    setCheckedValues((prevValues) => {
      const isChecked = prevValues.includes(value)
      if (isChecked) {
        return prevValues.filter((item) => item !== value)
      } else {
        return [...prevValues, value]
      }
    })
  }

  return (
    <div className='mt-2'>
      {options.map((option, index) => (
        <div key={index} className='grid grid-cols-4 items-center'>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedValues.includes(option.value)}
                onChange={() => {
                  handleCheckboxChange(option.value)
                  const updatedValues = checkedValues.includes(option.value)
                    ? checkedValues.filter((item) => item !== option.value)
                    : [...checkedValues, option.value]
                  field.onChange(updatedValues)
                }}
                sx={{
                  color: orange[400],
                  '&.Mui-checked': {
                    color: orange[400]
                  }
                }}
                name={name}
                value={option.value}
              />
            }
            label={option.label}
            {...props}
          />
          {option.input && (
            <div className='flex items-center gap-4'>
              
              <input type='text' className='w-[100px] rounded-lg border bg-white p-2' />
              <span className='font-semibold'>Đến</span>
              <input type='text' className='w-[100px] rounded-lg border bg-white p-2' />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default CheckboxGroup

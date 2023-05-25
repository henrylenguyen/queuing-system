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

  const [inputValues, setInputValues] = useState(() =>
    options.map((option) => {
      if (option.input) {
        return option.numberOfInput > 1 ? new Array(option.numberOfInput).fill('') : ''
      }
      return null
    })
  )
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
        <div key={index} className='mt-4 grid grid-cols-4 items-center'>
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
              {Array.from({ length: option.numberOfInput }).map((_, i) => (
                <input
                  key={i}
                  type='number'
                  className='w-[100px] rounded-lg border bg-white p-2 '
                  defaultValue={option.value}
                  value={Array.isArray(inputValues[index]) ? inputValues[index][i] : inputValues[index]}
                  onChange={(event) => {
                    const value = event.target.value
                    setInputValues((prevValues) => {
                      const newValues = [...prevValues]
                      if (Array.isArray(newValues[index])) {
                        newValues[index][i] = value
                      } else {
                        newValues[index] = value
                      }
                      return newValues
                    })
                  }}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default CheckboxGroup

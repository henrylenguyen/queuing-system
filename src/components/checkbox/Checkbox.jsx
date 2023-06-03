import { useState } from 'react'
import { FormControlLabel, Checkbox } from '@mui/material'
import { useController } from 'react-hook-form'
import { orange } from '@mui/material/colors'
import { onChangeInputValue } from 'redux/slice/services.slice'
import { useDispatch } from 'react-redux'

const CheckboxGroup = ({ options, control, name, ...props }) => {
  const { field } = useController({
    control,
    name
  })
  const [inputValues, setInputValues] = useState(Array(4).fill(''))

  const [checkedValues, setCheckedValues] = useState(() => {
    return options.filter((option) => option.checked).map((option) => option.value)
  })

  const dispatch = useDispatch()

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
  const handleInputChange = (event, index) => {
    const newInputValues = [...inputValues]
    newInputValues[index] = event.target.value
    setInputValues(newInputValues)
    dispatch(onChangeInputValue(newInputValues))
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
                name={option.value.name}
                value={option.value}
              />
            }
            label={option.label}
            {...props}
          />
          {option.input && (
            <div className='flex items-center gap-4'>
              {option.numberOfInput > 1
                ? Array.from({ length: option.numberOfInput }).map((_, i) => {
                    return (
                      <input
                        key={i}
                        type='number'
                        className='w-[100px] rounded-lg border bg-white p-2 '
                        defaultValue={option.value}
                        name={option.value.name}
                        onChange={(e) => handleInputChange(e, i)}
                      />
                    )
                  })
                : Array.from({ length: option.numberOfInput }).map((_, i) => {
                    const inputIndex = index * option.numberOfInput + i + 1
                    return (
                      <input
                        key={inputIndex}
                        type='number'
                        className='w-[100px] rounded-lg border bg-white p-2 '
                        defaultValue={option.value}
                        name={option.value.name}
                        onChange={(e) => handleInputChange(e, inputIndex)}
                      />
                    )
                  })}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default CheckboxGroup

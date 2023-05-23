import React from 'react'
import Select from 'react-select'
import { useController } from 'react-hook-form'

const Dropdown = ({ control, name, options, defaultValue, ...props }) => {
  const {
    field: { value, onChange }
  } = useController({
    control,
    name,
    defaultValue: defaultValue  
  })

  const selectOptions = options.map((option) => ({
    label: option.label,
    value: option.value
  }))

  return (
    <Select
      options={selectOptions}
      value={selectOptions.find((option) => option.value === (value || defaultValue)) || null}
      onChange={(selectedOption) => {
        onChange(selectedOption?.value)
        if (props.SelectOption) props.SelectOption(selectedOption)
      }}
      {...props}
      className={`${props.errors ? 'border border-red-500' : 'border border-gray-300'} ${props.className} border-none`}
    />
  )
}

export default Dropdown

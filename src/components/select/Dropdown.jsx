import React from 'react'
import Select from 'react-select'
import { useController } from 'react-hook-form'

const Dropdown = ({ control, name, options, ...props }) => {
  const {
    field: { value, onChange }
  } = useController({
    control,
    name,
    defaultValue: props.defaultValue
      ? {
          label: props.defaultValue.label,
          value: props.defaultValue.value
        }
      : null
  })

  const selectOptions = options.map((option) => ({
    label: option.label,
    value: option.value
  }))

  return (
    <Select
      options={selectOptions}
      value={
        selectOptions.find(
          (option) => option.value === (value || props.defaultValue) // Sử dụng defaultValue nếu value không tồn tại
        ) || null // Trả về null nếu không tìm thấy giá trị phù hợp
      }
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

import React from 'react'
import Select from 'react-select'
import { useController } from 'react-hook-form'

const TreeSelect = ({ control, name, options, defaultValue, ...props }) => {
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
      isMulti
      value={selectOptions.filter((option) => value?.includes(option.value))}
      onChange={(selectedOptions) => {
        const selectedValues = selectedOptions ? selectedOptions.map((option) => option.value) : []
        onChange(selectedValues)
        if (props.SelectOption) props.SelectOption(selectedOptions)
      }}
      {...props}
      className={`${props.errors ? 'border border-red-500' : 'border border-gray-300'} ${props.className} border-none`}
    />
  )
}

export default TreeSelect

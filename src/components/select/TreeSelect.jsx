import React from 'react'
import Select from 'react-select'
import { useController } from 'react-hook-form'
import colourStyles from 'utils/customSelect'

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

  const defaultOptions = defaultValue
  ? defaultValue?.map((option) => ({
    label: option,
    value: option
  }))
  : []

  return (
    <Select
      styles={colourStyles}
      defaultValue={defaultOptions}
      options={selectOptions}
      isMulti
      onChange={(selectedOptions) => {
        const selectedValues = selectedOptions ? selectedOptions.map((option) => option.value) : []
        onChange(selectedValues)
      }}
      {...props}
      className={`${props.errors ? 'border border-red-500' : 'border border-gray-300'} ${props.className} border-none`}
    />
  )
}

export default TreeSelect

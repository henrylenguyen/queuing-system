import Select, { CSSObjectWithLabel, GroupBase, StylesConfig, components } from 'react-select'
import chroma from 'chroma-js'

export interface ColourOption {
  value: string
  label: string
  color?: string
  isFixed?: boolean
  isDisabled?: boolean
}

const colourStyles = {
  control: (styles: CSSObjectWithLabel) => ({
    ...styles,
    backgroundColor: 'white',
    boxShadow: 'none',
    cursor: 'pointer',
    borderRadius: '8px',
    border: '1.5px solid #D4D4D7',
    '&:hover': {
      boxShadow: 'none',
      borderColor: '#FF9138'
    },
    svg: {
      fill: '#FF9138' // Màu fill tùy chỉnh cho SVG
    }
  }),

  indicatorSeparator: (styles: CSSObjectWithLabel) => ({
    ...styles,
    display: 'none'
  }),
  indicatorContainer: (styles: CSSObjectWithLabel) => ({
    ...styles,
    fill: '#FF9138'
  }),
  option: (styles: CSSObjectWithLabel, { isSelected, isFocused }: { isSelected: boolean; isFocused: boolean }) => ({
    ...styles,
    cursor: 'pointer',
    backgroundColor: isSelected ? '#FF9138' : '#fff', // Màu nền tùy chỉnh cho option được chọn và không được chọn
    color: isSelected ? ' #fff' : 'black', // Màu chữ tùy chỉnh cho option được chọn và không được chọn
    ':hover': {
      backgroundColor: isFocused ? ' #FFF2E7' : 'lightgray', // Custom background color when hovering
      color: 'black', // Custom text color when hovering
      cursor: 'pointer' // Custom cursor style when hovering
    }
  }),
  multiValue: (styles: CSSObjectWithLabel) => ({
    ...styles,
    backgroundColor: '#FF9138',
    borderRadius: '9px',
    padding: '5px'
  }),
  multiValueLabel: (styles: CSSObjectWithLabel) => ({
    ...styles,
    color: '#fff'
  }),
  multiValueRemove: (styles: CSSObjectWithLabel) => ({
    ...styles,
    svg: {
      fill: '#fff'
    }
  })
}

export default colourStyles

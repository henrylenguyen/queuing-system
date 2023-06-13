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
  })
}

export default colourStyles

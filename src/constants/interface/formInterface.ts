import { ReactNode } from 'react'
import * as yup from 'yup'
import React from 'react'

interface RestProps {
  label: string
  options: any
  value: any
}
export interface IFields {
  name: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'date' | 'time' | 'datetime' | 'number' | 'password'
  placeholder: string
  className?: string
  classNameDiv?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  label: string
  defaultValue?: any
  options?: RestProps
  value?: any
}
interface DynamicObject {
  [key: string]: any
}

export interface IFormProps {
  schema: yup.AnyObjectSchema
  dataValidate?: any
  fields: IFields[]
  handleSubmitForm?: (data: any) => void
  title?: string
  initialValues?: DynamicObject
  gap?: string
  color?: string
  titleButton?: string
  titleButtonCancel?: string
  errors?: Record<string, string>
  readOnly?: boolean
  to?: string
}

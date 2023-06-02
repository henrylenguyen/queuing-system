import { yupResolver } from '@hookform/resolvers/yup'
import { IFormProps } from 'constants/interface/formInterface'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import DateTimePickerField from '../datetime/DateTimePickerField'
import Dropdown from '../select/Dropdown'
import TreeSelect from 'components/select/TreeSelect'
import CheckboxGroup from '../checkbox/Checkbox'
import IOption from 'constants/interface/option.interface'

const Form = ({
  schema,
  fields,
  handleSubmitForm,
  gap,
  color = 'text-gray-700',
  initialValues,
  title,
  titleButton,
  titleButtonCancel,
  to
}: IFormProps) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid }
  } = useForm({
    resolver: yupResolver(schema),
    shouldUnregister: true
  })
  const navigate = useNavigate()
  const [passwordFields, setPasswordFields] = useState<boolean[]>([])
  const timeoutRef = useRef<number | null>(null)

  const togglePasswordVisibility = (index: number) => {
    setPasswordFields((prevFields) => {
      const updatedFields = [...prevFields]
      updatedFields[index] = !updatedFields[index]
      return updatedFields
    })
  }
  const newFields = fields?.reduce((acc: any[], field) => {
    if (initialValues?.hasOwnProperty(field.name)) {
      acc.push({
        ...field,
        value: initialValues[field.name]
      })
    }
    return acc
  }, [])

  const renderPasswordInput = (
    index: number,
    name: string,
    placeholder: string,
    className?: string,
    readOnly?: boolean,
    value?: string
  ) => {
    const isPasswordVisible = passwordFields[index]

    return (
      <>
        <div className='relative'>
          <input
            defaultValue={value}
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder={placeholder}
            {...register(name)}
            name={name}
            readOnly={readOnly}
            className={`${
              errors[name]
                ? 'border-2 border-red-500 focus:ring-0'
                : readOnly
                ? 'bg-gray-200 focus:ring-0'
                : 'focus:ring-2 focus:ring-inset focus:ring-orange-400'
            } ${className}`}
          />
          <span className='absolute right-2 top-2 cursor-pointer' onClick={() => togglePasswordVisibility(index)}>
            {isPasswordVisible ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='icon icon-tabler icon-tabler-eye'
                width={24}
                height={24}
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0' />
                <path d='M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6' />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='icon icon-tabler icon-tabler-eye-off'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                strokeWidth='2'
                stroke='currentColor'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                <path d='M10.585 10.587a2 2 0 0 0 2.829 2.828'></path>
                <path d='M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87'></path>
                <path d='M3 3l18 18'></path>
              </svg>
            )}
          </span>
        </div>
      </>
    )
  }
  const onSubmit = async (data: any) => {
    try {
      if (isValid) {
        if (handleSubmitForm) {
          clearTimeout(timeoutRef.current ?? undefined)

          handleSubmitForm(data)

          return new Promise<void>((resolve) => {
            setTimeout(() => {
              resolve()
            }, 1000)
          }).then(() => {
            clearTimeout(timeoutRef.current ?? undefined)
          })
        }
      }
    } catch (error: any) {}
  }

  return (
    <>
      {title && <h3 className=' mb-10 text-[20px] font-bold text-primary'>{title}</h3>}

      <form onSubmit={handleSubmit(onSubmit)} className={`mt-2 grid w-full grid-cols-4 `} style={{ gap: gap }}>
        {newFields?.length > 0
          ? newFields?.map(
              (
                { name, type, placeholder, onChange, className, classNameDiv, label, options, value, readOnly },
                index
              ) => (
                <div key={name} className={`${classNameDiv} flex flex-col gap-2`}>
                  <label className={` block font-medium ${color}`} htmlFor={name}>
                    {label}
                  </label>
                  {type === 'select' ? (
                    <Dropdown
                      defaultValue={value}
                      control={control}
                      placeholder={placeholder}
                      name={name}
                      options={options}
                      errors={errors[name]}
                      className={className}
                    />
                  ) : type === 'selectmuti' ? (
                    <TreeSelect
                      defaultValue={value}
                      control={control}
                      placeholder={placeholder}
                      name={name}
                      options={options}
                      errors={errors[name]}
                      className={className}
                    />
                  ) : type === 'date' ? (
                    <DateTimePickerField
                      control={control}
                      name={name}
                      errors={errors}
                      type='date'
                      defaultValue={value}
                    />
                  ) : type === 'time' ? (
                    <DateTimePickerField
                      control={control}
                      name={name}
                      errors={errors}
                      type='time'
                      defaultValue={value}
                    />
                  ) : type === 'checkbox' ? (
                    <CheckboxGroup
                      control={control}
                      options={options as IOption[]}
                      name={name}
                      errors={errors[name]}
                      defaultValue={value}
                    />
                  ) : type === 'datetime' ? (
                    <DateTimePickerField
                      control={control}
                      name={name}
                      errors={errors}
                      type='datetime'
                      defaultValue={value}
                    />
                  ) : type === 'textarea' ? (
                    <textarea
                      placeholder={placeholder}
                      {...register(name)}
                      name={name}
                      className={`${
                        errors[name]
                          ? 'border-2 border-red-500 focus:ring-0'
                          : readOnly
                          ? 'bg-gray-200 focus:ring-0'
                          : 'focus:ring-2 focus:ring-inset focus:ring-orange-400'
                      } ${className} h-full p-2`}
                      rows={3}
                      defaultValue={value}
                    />
                  ) : type === 'password' ? (
                    renderPasswordInput(index, name, placeholder, className, readOnly, value)
                  ) : (
                    <input
                      type={type}
                      placeholder={placeholder}
                      {...register(name)}
                      name={name}
                      defaultValue={value}
                      className={`${
                        errors[name]
                          ? 'border-2 border-red-500 focus:ring-0'
                          : readOnly
                          ? 'bg-gray-200 focus:ring-0'
                          : 'focus:ring-2 focus:ring-inset focus:ring-orange-400'
                      } ${className}`}
                      readOnly={readOnly}
                    />
                  )}

                  {errors[name] && (
                    <span className='text-buttonColor text-sm italic'>{String(errors[name]?.message)}</span>
                  )}
                </div>
              )
            )
          : fields?.map(
              (
                { name, type, placeholder, onChange, className, classNameDiv, label, options, value, readOnly },
                index
              ) => (
                <div key={name} className={`${classNameDiv} flex flex-col gap-2`}>
                  <label className={`block font-medium ${color}`} htmlFor={name}>
                    {label}
                  </label>
                  {type === 'select' ? (
                    <Dropdown
                      defaultValue={value}
                      control={control}
                      placeholder={placeholder}
                      name={name}
                      options={options}
                      errors={errors[name]}
                      className={className}
                    />
                  ) : type === 'selectmuti' ? (
                    <TreeSelect
                      defaultValue={value}
                      control={control}
                      placeholder={placeholder}
                      name={name}
                      options={options}
                      errors={errors[name]}
                      className={className}
                    />
                  ) : type === 'date' ? (
                    <DateTimePickerField
                      defaultValue={value}
                      control={control}
                      name={name}
                      errors={errors}
                      type='date'
                    />
                  ) : type === 'checkbox' ? (
                    <CheckboxGroup
                      control={control}
                      options={options as IOption[]}
                      name={name}
                      errors={errors[name]}
                      defaultValue={value}
                    />
                  ) : type === 'time' ? (
                    <DateTimePickerField
                      defaultValue={value}
                      control={control}
                      name={name}
                      errors={errors}
                      type='time'
                    />
                  ) : type === 'datetime' ? (
                    <DateTimePickerField
                      control={control}
                      name={name}
                      errors={errors}
                      type='datetime'
                      defaultValue={value}
                    />
                  ) : type === 'number' ? (
                    <input
                      type={type}
                      placeholder={placeholder}
                      {...register(name)}
                      name={name}
                      className={`${errors[name] ? 'border-buttonColor border ' : ''} ${className} `}
                      min={1}
                      max={10}
                    />
                  ) : type === 'textarea' ? (
                    <textarea
                      placeholder={placeholder}
                      {...register(name)}
                      name={name}
                      className={`${
                        errors[name]
                          ? 'border-2 border-red-500 focus:ring-0'
                          : readOnly
                          ? 'bg-gray-200 focus:ring-0'
                          : 'focus:ring-2 focus:ring-inset focus:ring-orange-400'
                      } ${className} h-full p-2`}
                      rows={2}
                    />
                  ) : type === 'password' ? (
                    renderPasswordInput(index, name, placeholder, className, readOnly)
                  ) : (
                    <input
                      type={type}
                      readOnly={readOnly}
                      placeholder={placeholder}
                      {...register(name)}
                      name={name}
                      className={`${
                        errors[name]
                          ? 'border-2 border-red-500 focus:ring-0'
                          : readOnly
                          ? 'bg-gray-200 focus:ring-0'
                          : 'focus:ring-2 focus:ring-inset focus:ring-orange-400'
                      } ${className}`}
                    />
                  )}

                  {errors[name] && <span className='text-sm italic text-red-500'>{String(errors[name]?.message)}</span>}
                </div>
              )
            )}

        <div className='col-span-4 mt-10 flex w-full justify-center gap-5'>
          {titleButtonCancel && (
            <button
              className=' w-[200px] rounded-md border border-primary  p-[10px] text-[18px] font-medium text-primary'
              onClick={() => navigate(`${to}`)}
            >
              {titleButtonCancel}
            </button>
          )}
          {titleButton && (
            <button
              type='submit'
              className=' w-[200px] rounded-md bg-primary p-[10px] text-[18px] font-medium text-white'
            >
              {isSubmitting ? (
                <div className='mx-auto h-[20px] w-[20px] animate-spin rounded-full border-2 border-t-2 border-white border-t-transparent'></div>
              ) : (
                `${titleButton}`
              )}
            </button>
          )}
        </div>
      </form>
      {/* {errorMessage && <div className='text-red-500'>{errorMessage}</div>} */}
    </>
  )
}

export default Form

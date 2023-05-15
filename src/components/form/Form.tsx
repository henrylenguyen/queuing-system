import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Dropdown from '../select/Dropdown'
import DateTimePickerField from '../datetime/DateTimePickerField'
import { IFormProps } from 'constants/interface/formInterface'

const Form = ({
  schema,
  fields,
  handleSubmitForm,
  gap,
  color = 'text-gray-700',
  initialValues,
  title,
  readOnly,
  titleButton
}: IFormProps) => {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isValid }
  } = useForm({
    resolver: yupResolver(schema),
    shouldUnregister: true
  })
  const onSubmit = (data: any) => {
    handleSubmitForm(data)
    if (!isValid) return
    // để hiển thị loading trên nút
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve()
        reset()
      }, 1000)
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

  return (
    <>
      {title && <h3 className='text-center text-[30px] font-semibold uppercase'>{title}</h3>}

      <form onSubmit={handleSubmit(onSubmit)} className={`mt-2 grid w-full grid-cols-3 `} style={{ gap: gap }}>
        {newFields?.length > 0
          ? newFields?.map(({ name, type, placeholder, onChange, className, classNameDiv, label, options, value }) => (
              <div key={name} className={classNameDiv}>
                <label className={`mb-2 block font-medium ${color}`} htmlFor={name}>
                  {label}
                </label>
                {type === 'select' ? (
                  <Dropdown
                    control={control}
                    name={name}
                    options={options}
                    errors={errors[name]}
                    defaultValue={value}
                  />
                ) : type === 'date' ? (
                  <DateTimePickerField control={control} name={name} errors={errors} type='date' defaultValue={value} />
                ) : type === 'time' ? (
                  <DateTimePickerField control={control} name={name} errors={errors} type='time' defaultValue={value} />
                ) : type === 'datetime' ? (
                  <DateTimePickerField
                    control={control}
                    name={name}
                    errors={errors}
                    type='datetime'
                    defaultValue={value}
                  />
                ) : (
                  <input
                    type={type}
                    placeholder={placeholder}
                    {...register(name)}
                    name={name}
                    defaultValue={value}
                    className={`${errors[name] ? 'border-buttonColor border' : ''} ${className}`}
                    readOnly={readOnly}
                  />
                )}

                {errors[name] && (
                  <span className='text-buttonColor text-sm italic'>{String(errors[name]?.message)}</span>
                )}
              </div>
            ))
          : fields?.map(({ name, type, placeholder, onChange, className, classNameDiv, label, options, value }) => (
              <div key={name} className={classNameDiv}>
                <label className={`mb-2 block font-medium ${color}`} htmlFor={name}>
                  {label}
                </label>
                {type === 'select' ? (
                  onChange ? (
                    <Dropdown
                      control={control}
                      name={name}
                      options={options}
                      errors={errors[name]}
                      SelectOption={onChange}
                      className={className}
                    />
                  ) : (
                    <Dropdown
                      control={control}
                      name={name}
                      options={options}
                      errors={errors[name]}
                      className={className}
                    />
                  )
                ) : type === 'date' ? (
                  <DateTimePickerField defaultValue={value} control={control} name={name} errors={errors} type='date' />
                ) : type === 'time' ? (
                  <DateTimePickerField defaultValue={value} control={control} name={name} errors={errors} type='time' />
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
                    className={`${errors[name] ? 'border-buttonColor border ' : ''} ${className} `}
                    rows={2}
                  />
                ) : (
                  <input
                    type={type}
                    placeholder={placeholder}
                    {...register(name)}
                    name={name}
                    className={`${errors[name] ? 'border-2 border-red-500 focus:ring-0' : ''} ${className}`}
                  />
                )}

                {errors[name] && <span className='text-sm italic text-red-500'>{String(errors[name]?.message)}</span>}
              </div>
            ))}

        <div className='col-span-3 mt-10 text-center'>
          {titleButton && (
            <button
              type='submit'
              className='shadow-secondShadow w-[200px] rounded-md bg-primary p-[10px] text-[18px] font-medium text-white'
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
    </>
  )
}

export default Form

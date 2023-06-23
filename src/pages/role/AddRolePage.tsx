import { Checkbox } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { CheckboxValueType } from 'antd/es/checkbox/Group'
import PageInfor from 'components/pageInfor/PageInfor'
import { useForm, Controller } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const CheckboxGroup = Checkbox.Group
type Props = {}
const validationSchema = yup.object().shape({
  tenVaiTro: yup.string().required('Tên vai trò là bắt buộc'),
  moTa: yup.string().required('Mô tả là bắt buộc')
})

const onSubmit = (data: any) => {
  console.log(data)
}
const plainOptions = ['Apple', 'Pear', 'Orange']
const AddRolePage = (props: Props) => {
  const [checkAll, setCheckAll] = useState(false)
  const navigate = useNavigate()
const {
  control,
  handleSubmit,
  register,
  formState: { errors },
  setValue
} = useForm({
  resolver: yupResolver(validationSchema)
})

const handleCheckAll = (e: CheckboxChangeEvent) => {
  const checked = e.target.checked
  setCheckAll(checked)
  const newValues = checked ? plainOptions : []
  setValue('functionality', newValues)
}
  return (
    <div className='pt-10 '>
      <PageInfor />
      <div className='flex h-full px-10 pt-14  max-[1440px]:px-5'>
        <div className=' flex flex-grow flex-col justify-between overflow-hidden'>
          <div className='w-full'>
            <h3 className='text-[25px] font-semibold text-primary min-[1500px]:text-[30px]'>Thêm mới vai trò</h3>
            <div className='my-10 w-full rounded-xl bg-white p-5'>
              <h3 className=' mb-10 text-[20px] font-bold text-primary'>Thông tin vai trò</h3>
              <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-5'>
                <div className='form-left flex flex-col gap-2'>
                  <div className='flex flex-col gap-3'>
                    <label htmlFor='tenVaiTro' className='block font-medium text-gray-700'>
                      Tên vai trò: *
                    </label>
                    <input
                      type='text'
                      id='tenVaiTro'
                      {...register('tenVaiTro')}
                      className={`w-full rounded-md border border-[#D4D4D7] bg-white p-2 ${
                        errors.tenVaiTro ? 'border-red-500' : ''
                      }`}
                      placeholder='Nhập tên vai trò'
                    />
                    {errors.tenVaiTro && <span className='text-red-500'>{String(errors?.tenVaiTro.message)}</span>}
                  </div>
                  <div className='flex flex-col gap-3'>
                    <label htmlFor='moTa' className='block font-medium text-gray-700'>
                      Mô tả: *
                    </label>
                    <textarea
                      id='moTa'
                      {...register('moTa')}
                      className={`h-[160px] w-full rounded-md border border-[#D4D4D7] bg-white p-2 ${
                        errors.moTa ? 'border-red-500' : ''
                      }`}
                      placeholder='Nhập mô tả'
                    ></textarea>
                    {errors.moTa && <span className='text-red-500'>{String(errors?.moTa.message)}</span>}
                  </div>
                </div>

                <div className='form-right'>
                  <label htmlFor='' className='block font-medium text-gray-700'>
                    Phân quyền chức năng: *
                  </label>

                  <div className='mt-3 flex h-[500px] max-h-[500px] flex-col gap-5 bg-[#FFF2E7] p-5'>
                    <h3 className='  text-[20px] font-bold text-primary'>Nhóm chức năng A</h3>
                    <div className='flex flex-col gap-5'>
                      <Controller
                        name='allFunctionalities'
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                          <Checkbox
                            checked={field.value}
                            onChange={(e) => {
                              field.onChange(e.target.checked)
                              handleCheckAll(e)
                            }}
                          >
                            Tất cả
                          </Checkbox>
                        )}
                      />

                      <Controller
                        name='functionality'
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => (
                          <CheckboxGroup
                            options={plainOptions}
                            value={field.value}
                            onChange={(values) => {
                              field.onChange(values)
                              setCheckAll(values.length === plainOptions.length)
                            }}
                            className='flex flex-col gap-5'
                          />
                        )}
                      />
                    </div>
                    <h3 className='  text-[20px] font-bold text-primary'>Nhóm chức năng B</h3>
                  </div>
                </div>
                <div className='col-span-4 mt-10 flex w-full justify-center gap-5'>
                  <button
                    className=' w-[200px] rounded-md border border-primary  p-[10px] text-[18px] font-medium text-primary'
                    onClick={() => navigate(`/role/role-manegement`)}
                  >
                    Hủy bỏ
                  </button>

                  <button
                    type='submit'
                    className=' w-[200px] rounded-md bg-primary p-[10px] text-[18px] font-medium text-white'
                  >
                    Thêm
                    {/* <div className='mx-auto h-[20px] w-[20px] animate-spin rounded-full border-2 border-t-2 border-white border-t-transparent'></div> */}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddRolePage

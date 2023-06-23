import { Checkbox, message } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import PageInfor from 'components/pageInfor/PageInfor'
import { useForm, Controller } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'redux/store'
import { fetchRoleDetail, postRole, updateRole } from 'redux/action/roles/roleList.action'
import { IRole } from 'constants/interface/role.interface'
import { clearRoleDetail, clearRoleStatus } from 'redux/slice/role.slice'
import Loading from 'components/loading/Loading'
const CheckboxGroup = Checkbox.Group
type Props = {}
const validationSchema = yup.object().shape({
  tenVaiTro: yup.string().required('Tên vai trò là bắt buộc'),
  moTa: yup.string().required('Mô tả là bắt buộc'),

  rule: yup
    .array()
    .transform((value, originalValue) => {
      if (originalValue === '') {
        return []
      }
      return value
    })
    .of(yup.string())
    .required('Vui lòng chọn ít nhất một tùy chọn')
    .min(1, 'Vui lòng chọn ít nhất một tùy chọn')
})

const plainOptions = ['Quản lý thiết bị', 'Quản lý người dùng', 'Quản lý dịch vụ', 'Cấp số', 'Báo cáo']
const UpdateRolePage = (props: Props) => {
  const { roleDetail, error } = useSelector((state: RootState) => state.role)
  const [checkAll, setCheckAll] = useState(false)
  const navigate = useNavigate()
  // dùng useLocation để lấy ra id sau dấu ?
  const location = useLocation().search
  // tách lấy id
  const path = location.split('?')[1]
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    clearErrors
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchRoleDetail(path))
    if (error) {
      message.error(`${error}`, 2)
    }
    return () => {
      dispatch(clearRoleDetail())
    }
  }, [dispatch, path])
  const onSubmit = (data: any) => {
    dispatch(updateRole({ id: path, data })).then(() => {
      message.success('Cập nhật vai trò thành công', 2).then(() => {
        navigate('/role/role-manegement')
      })
    })
  }

  const handleCheckAll = (e: CheckboxChangeEvent) => {
    const checked = e.target.checked
    setCheckAll(checked)
    const newValues = checked ? plainOptions : []
    setValue('rule', newValues)
    if (checked) {
      setValue('rule', newValues)
      clearErrors('rule')
    }
  }

  return (
  <>
  {roleDetail?.rule.length>0&&(  <div className='pt-10 '>
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
                      defaultValue={roleDetail?.tenVaiTro}
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
                      defaultValue={roleDetail?.moTa}
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

                  <div className='mt-3 flex h-[350px] max-h-[350px] flex-col gap-5 bg-[#FFF2E7] p-5'>
                    <h3 className='  text-[20px] font-bold text-primary'>Nhóm chức năng</h3>
                    <div className='flex flex-col gap-5'>
                      <Checkbox
                        checked={checkAll}
                        onChange={(e) => {
                          setCheckAll(e.target.checked)
                          handleCheckAll(e)
                        }}
                      >
                        Tất cả
                      </Checkbox>

                      <Controller
                        name='rule'
                        control={control}
                        defaultValue={roleDetail?.rule || []}
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

                      {errors.rule && <span className='text-red-500'>{String(errors?.rule.message)}</span>}
                    </div>
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
                    Cập nhật
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>)}
    {roleDetail?.rule.length===0&&<Loading/>}
  </>
  )
}

export default UpdateRolePage

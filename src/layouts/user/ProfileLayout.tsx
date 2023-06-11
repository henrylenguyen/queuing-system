import Form from 'components/form/Form'
import profileFields from 'constants/fields/profile.fields'
import { DynamicObject } from 'constants/interface/formInterface'
import { LoginShema } from 'constants/schemas/Login.schema'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import ProfileImage from './ProfileImage'

type Props = {}

const ProfileLayout = (props: Props) => {
  const { user } = useSelector((state: RootState) => state.auth)
  return (
    <div className='h-[500px] w-full rounded-2xl bg-white px-6 py-10'>
      <div className='flex h-full items-center gap-10'>
        <ProfileImage image={user?.avatar} name={user?.hoTen}></ProfileImage>
        <div className='w-full'>
          <Form schema={LoginShema} fields={profileFields} gap='30px' initialValues={user as DynamicObject} />
        </div>
      </div>
    </div>
  )
}

export default ProfileLayout

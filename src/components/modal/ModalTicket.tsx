import { Modal } from 'antd'
import React from 'react'
import { CloseOutlined } from '@ant-design/icons'

type Props = {
  isModalOpen: boolean
  handleCancel: ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined
  STT: number
  tenDichVu: string
  thoiGianCap: string
  hanSuDung:string
}

const ModalTicket = ({ isModalOpen, handleCancel, STT, tenDichVu,thoiGianCap,hanSuDung }: Props) => {
  return (
    <Modal
      open={isModalOpen}
      closeIcon={<CloseOutlined style={{ color: '#FF7506', fontWeight: 'bold' }} />}
      footer={null}
      centered
      onCancel={handleCancel}
      width={400}
      wrapClassName='custom-modal-wrap'
      style={{ textAlign: 'center' }}
    >
      <div className='py-10'>
        <h3 className='text-center text-[32px] font-bold text-[#535261]'>Số thứ tự được cấp</h3>
        <p className='text-[56px] font-extrabold text-[#FF7506]'>{STT}</p>
        <p className='text-[18px] font-bold'>DV: {tenDichVu}</p>
      </div>
      <div className='bg-primary py-5'>
        <p className='text-[18px] font-bold text-[#fff]'>Thời gian cấp: {thoiGianCap}</p>
        <p className='text-[18px] font-bold text-[#fff]'>Hạn sử dụng: {hanSuDung}</p>
      </div>
    </Modal>
  )
}

export default ModalTicket
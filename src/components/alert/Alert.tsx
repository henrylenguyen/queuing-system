import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Popover from '@mui/material/Popover'
import Badge from '@mui/material/Badge'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import { AppDispatch, RootState } from 'redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNumbersAlert } from 'redux/action/numbers/numberList.action'

const Alert: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const { numberAlert, addNumberDetail } = useSelector((state: RootState) => state.number)
  const dispatch = useDispatch<AppDispatch>()
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  useEffect(() => {
    dispatch(fetchNumbersAlert())
  }, [addNumberDetail])
  
  const open = Boolean(anchorEl)
  const id = open ? 'popover' : undefined

  return (
    <>
      <Button className='h-[55px] w-[50px] overflow-hidden rounded-full bg-[#FFF2E7]' onClick={handleClick}>
        <Badge badgeContent={10} color='primary'>
          <NotificationsActiveIcon sx={{ color: '#FFAC6A' }} fontSize='medium' />
        </Badge>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        PaperProps={{
          sx: { borderRadius: '16px', overflow: 'hidden' }
        }}
      >
        <div className='popover h-[450px] max-h-[450px] w-[380px] max-w-[380px] overflow-y-auto  '>
          <div>
            <div className='popover-header sticky left-0 top-0 h-[50px] max-h-[50px] overflow-hidden bg-primary p-5'>
              <h3 className='text-white'>Thông báo</h3>
            </div>
            <div className='popover-body h-[calc(100%_-_66px)] overflow-y-auto p-5'>
              {numberAlert.length > 0 &&
                numberAlert.map((item) => (
                  <div className='mb-5 flex flex-col gap-5 border-b pb-5'>
                    <h4 className=' font-bold  text-[#BF5805]'>Người dùng có số thứ tự: {item.STT}</h4>
                    <span className='text-[#535261]'>Thời gian nhận số: {item.thoiGianCap}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Popover>
    </>
  )
}

export default Alert

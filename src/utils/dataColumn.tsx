import { Badge, Image, Tooltip } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'

const getColumnConfig = (
  title: any,
  dataIndexKeyItem: any,
  newTitle: string,
  handleEdit?: (record: any) => void,
  handleDelete?: (record: any) => void,
  handleUpdate?: (record: any) => void
) => {
  const path = window.location.pathname
  const pathParts = path.split('/')
  const pathTo = pathParts[1]
  const columnConfig: any = {
    title: title,
    dataIndex: dataIndexKeyItem?.dataIndex,
    key: dataIndexKeyItem?.key ?? '',
    width: 150,
  }
  if (newTitle === 'chitiet') {
    return {
      title: title,
      width: 100,
      dataIndex: dataIndexKeyItem?.dataIndex ?? '',
      key: dataIndexKeyItem?.key ?? '',
      render: (text: any, record: any) => {
        return <NavLink className='text-[blue] underline' to={`${path}/${pathTo}-detail?${record.id}`}>Chi tiết</NavLink>
      },
    }
  } else if (newTitle === 'tuychinh') {
    return {
      title: title,
      width: 150,
      dataIndex: dataIndexKeyItem?.dataIndex ?? '',
      key: dataIndexKeyItem?.key ?? '',
      render: (text: any, record: any) => {
        return record.vaiTro !== 'quản trị' ? (
          <NavLink className='text-[blue] underline' to={`${path}/update-${pathTo}?${record.id}`}>
            Cập nhật
          </NavLink>
        ) : (
          ''
        )
      },
    }
  } else if (newTitle === 'dichvusudung') {
    return {
      title: title,
      width: 150,
      dataIndex: dataIndexKeyItem?.dataIndex ?? '',
      key: dataIndexKeyItem?.key ?? '',
      render: (text: any, record: any) => {
        return (
          <>
            <Tooltip title={text?.map((item: any) => item).join(', ')} color={'#FF9138'}>
              <p className='w-[150px] truncate'>
                {text?.map((item: any, index: number) => (
                  <span key={index} className='pr-2'>
                    {`${item}${index !== text.length - 1 ? ',' : ''}`}
                  </span>
                ))}
              </p>
            </Tooltip>
          </>
        )
      },
    }
  } else if (newTitle === 'mota') {
    return {
      title: title,
      width: 150,
      dataIndex: dataIndexKeyItem?.dataIndex ?? '',
      key: dataIndexKeyItem?.key ?? '',
      render: (text: any, record: any) => {
        return (
          <>
            <Tooltip title={text} color={'#FF9138'}>
              <p className='w-[150px] truncate'>{text}</p>
            </Tooltip>
          </>
        )
      },
    }
  } else if (newTitle === 'trangthaihoatdong') {
    return {
      title: title,
      width: 140,
      dataIndex: dataIndexKeyItem?.dataIndex ?? '',
      key: dataIndexKeyItem?.key ?? '',
      render: (text: any, record: any) => {
        const status = (text === true || text === 'Hoạt động') ? 'success' : 'error'
        const displayText = text === true || text === 'Hoạt động' ? 'Hoạt động' : 'Ngưng hoạt động'

        return <Badge status={status} text={displayText} />
      }
    }
  } else if (newTitle === 'trangthaiketnoi') {
    return {
      title: title,
      width: 150,
      dataIndex: dataIndexKeyItem?.dataIndex ?? '',
      key: dataIndexKeyItem?.key ?? '',
      render: (text: any, record: any) => {
        return <Badge status={`${text ? 'success' : 'error'}`} text={`${text ? 'Kết nối' : 'Mất kết nối'}`} />
      }
    }
  } else if (newTitle === 'trangthai') {
    return {
      title: title,
      width: 170,
      dataIndex: dataIndexKeyItem?.dataIndex ?? '',
      key: dataIndexKeyItem?.key ?? '',
      render: (text: any, record: any) => {
        return (
          <Badge
            status={`${text === 'pending' ? 'processing' : text === 'used' ? 'default' : 'error'}`}
            text={`${text === 'pending' ? 'Đang chờ' : text === 'used' ? 'Đã sử dụng' : 'Bỏ qua'}`}
          />
        )
      }
    }
  }

  return columnConfig
}

export default getColumnConfig

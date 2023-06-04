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
    width: 200,
    align: 'center'
  }
  if (newTitle === 'chitiet') {
    return {
      title: title,
      width: 100,
      dataIndex: dataIndexKeyItem?.dataIndex ?? '',
      key: dataIndexKeyItem?.key ?? '',
      render: (text: any, record: any) => {
        return <NavLink to={`${path}/${pathTo}-detail?${record.id}`}>Chi tiết</NavLink>
      },
      align: 'center'
    }
  } else if (newTitle === 'tuychinh') {
    return {
      title: title,
      width: 150,
      dataIndex: dataIndexKeyItem?.dataIndex ?? '',
      key: dataIndexKeyItem?.key ?? '',
      render: (text: any, record: any) => {
        return <NavLink to={`${path}/update-${pathTo}?${record.id}`}>Cập nhật</NavLink>
      },
      align: 'center'
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
      align: 'center'
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
      align: 'center'
    }
  } else if (newTitle === 'trangthaihoatdong') {
    return {
      title: title,
      width: 170,
      dataIndex: dataIndexKeyItem?.dataIndex ?? '',
      key: dataIndexKeyItem?.key ?? '',
      align: 'center',
      render: (text: any, record: any) => {
        return <Badge status={`${text ? 'success' : 'error'}`} text={`${text ? 'Hoạt động' : 'Ngưng hoạt động'}`} />
      }
    }
  } else if (newTitle === 'trangthaiketnoi') {
    return {
      title: title,
      width: 150,
      dataIndex: dataIndexKeyItem?.dataIndex ?? '',
      key: dataIndexKeyItem?.key ?? '',
      align: 'center',
      render: (text: any, record: any) => {
        return <Badge status={`${text ? 'success' : 'error'}`} text={`${text ? 'Kết nối' : 'Mất kết nối'}`} />
      }
    }
  }

  return columnConfig
}

export default getColumnConfig

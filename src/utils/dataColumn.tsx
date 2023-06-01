import { Image } from 'antd'
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
      dataIndex: dataIndexKeyItem?.dataIndex ?? '',
      key: dataIndexKeyItem?.key ?? '',
      render: (text: any, record: any) => (
        <NavLink to={`/device/device-list/device-detail?${record.maThietBi}`}>Chi tiết</NavLink>
      )
    }
  }

  return columnConfig
}

export default getColumnConfig

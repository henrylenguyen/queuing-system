import { Image } from 'antd'
import React from 'react'

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
  if (newTitle === 'mathietbi') {
    columnConfig.render = (text: string, record: any) => (
      <Image
        src='https://khoinguonsangtao.vn/wp-content/uploads/2022/09/hinh-ve-don-gian-cute-dang-yeu-va-de-thuc-hien.jpg'
        width='100px'
        alt={'a'}
      />
    )
  }

  return columnConfig
}

export default getColumnConfig

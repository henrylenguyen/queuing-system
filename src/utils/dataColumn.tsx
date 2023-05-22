import { Device } from 'constants/interface/device.interface'
interface ColumnType {
  title: string
  dataIndex: string
  key: string
  width?: number | string
  align?: string
  sorter?: any
}

const getColumnDeviceConfig = (
  title: { title: string },
  dataIndexKeyItem: { dataIndex: string; key: string } | undefined,
  newTitle: string,
  handleEdit?: (record: Device) => void,
  handleDelete?: (record: Device) => void,
  handleUpdate?: (record: Device) => void
): ColumnType => {
  let width = 100 // Default width

  if (newTitle.includes('dichvusudung')) {
    width = 200
  }
  const columnConfig: ColumnType = {
    title: title.title,
    dataIndex: dataIndexKeyItem?.dataIndex ?? '',
    key: dataIndexKeyItem?.key ?? '',
    width,
    align: 'center'
  }
  return columnConfig // Add this return statement
}

export default getColumnDeviceConfig

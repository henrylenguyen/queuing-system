import { Select, Button, Input, Space, Table, Spin, InputRef } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import { Device } from 'constants/interface/device.interface'
const { Option } = Select

interface ColumnType {
  title: string
  dataIndex: string
  key: string
}

interface CustomTableProps {
  columns: ColumnType[]
  data: any[]
  Key?: string
}

const CustomTable: React.FC<CustomTableProps> = ({ columns, data, Key }) => {
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(true)
  const [filteredData, setFilteredData] = useState(data)

  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)

  useEffect(() => {
    if (filteredData.length > 0) {
      setLoading(false)
    }
  }, [filteredData])

  // --------------------------- TÌM KIẾM------------------------
  const handleSearch = (selectedKeys: React.Key[], confirm: () => void, dataIndex: string) => {
    confirm()
    setLoading(true)
    setSearchText(selectedKeys[0] as string)
    setSearchedColumn(dataIndex)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  // --------------------------- NÚT RESET-----------------------
  const handleReset = (clearFilters: (() => void) | undefined) => {
    clearFilters && clearFilters()
    setSearchText('')
  }

  // --------------------------- DROPDOWN Ô TÌM KIẾM--------------------------
  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }: any) => (
      <div
        style={{
          padding: 8
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0] as string}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block'
          }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{
              width: 90
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size='small'
            style={{
              width: 90
            }}
          >
            Reset
          </Button>

          <Button
            type='link'
            size='small'
            onClick={() => {
              close()
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined
        }}
      />
    ),
    onFilter: (value: string, record: any) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: (text: string) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
  })

  return (
    <div className='mt-10 flex-grow select-none overflow-auto rounded-lg'>
      <Spin spinning={loading} size='large'>
        <Table
          rowKey={Key}
          dataSource={filteredData}
          scroll={{ x: 'max-content', y: 500 }}
          columns={columns.map((col) => {
            if (
              col.key.toLowerCase() === 'diachiip' ||
              col.key.toLowerCase() === 'trangthaihoatdong' ||
              col.key.toLowerCase() === 'trangthaiketnoi'
            ) {
              return {
                ...col
              }
            }
            return {
              ...col,
              ...getColumnSearchProps(col.dataIndex),
              onFilter: (value: string | number | boolean, record: any) =>
                record[col.dataIndex].toString().toLowerCase().includes(value.toString().toLowerCase())
            }
          })}
        />
      </Spin>
    </div>
  )
}

export default CustomTable

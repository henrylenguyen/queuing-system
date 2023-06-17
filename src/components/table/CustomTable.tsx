import { Select, Button, Input, Space, Table, Spin, InputRef } from 'antd'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
const { Option } = Select

export interface ColumnType {
  title: string
  dataIndex: string
  key: string
  render?: (text: any, record: any) => React.ReactNode
  width?: string | number
}

interface CustomTableProps {
  columns: ColumnType[]
  data: any[]
  Key?: string
}

const CustomTable: React.FC<CustomTableProps> = React.memo(({ columns, data, Key }) => {
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(true)
  const [filteredData, setFilteredData] = useState(data)

  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (filteredData.length > 0) {
      setLoading(false)
    }
  }, [filteredData])

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current!)
    }
  }, [])

  // --------------------------- TÌM KIẾM------------------------
  const handleSearch = useCallback((selectedKeys: React.Key[], confirm: () => void, dataIndex: string) => {
    confirm()
    setLoading(true)
    setSearchText(selectedKeys[0] as string)
    setSearchedColumn(dataIndex)
    clearTimeout(timeoutRef.current!)
    timeoutRef.current = setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  // --------------------------- NÚT RESET-----------------------
  const handleReset = useCallback((clearFilters: (() => void) | undefined) => {
    clearFilters && clearFilters()
    setSearchText('')
  }, [])

  // --------------------------- DROPDOWN Ô TÌM KIẾM--------------------------
  const getColumnSearchProps = useMemo(
    () => (dataIndex: string) => {
      const filterDropdown = ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }: any) => (
        <div
          style={{
            padding: 8
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Input
            ref={searchInput}
            placeholder={`Tìm kiếm ${dataIndex}`}
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
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size='small'
              style={{
                width: 90,
                background: '#FF7506',
                color: 'white',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              Tìm kiếm
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size='small'
              style={{
                width: 90,
                background: ' #FFF2E7',
                color: '#333'
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
      )

      const filterIcon = (filtered: boolean) => (
        <SearchOutlined
          style={{
            color: filtered ? '#1890ff' : '#fff'
          }}
        />
      )

      const onFilter = (value: string, record: any) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())

      const onFilterDropdownOpenChange = (visible: boolean) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100)
        }
      }

      const render = (text: string) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: '#ffc069',
              color: 'white',
              padding: 0
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        )

      return {
        filterDropdown,
        filterIcon,
        onFilter,
        onFilterDropdownOpenChange,
        render
      }
    },
    [searchText, searchedColumn, handleSearch, handleReset]
  )

  return (
    <div className='mt-10 flex-grow select-none overflow-auto rounded-lg'>
      <Spin spinning={loading} size='large'>
        <Table
          className='custom-table'
          rowKey={Key}
          pagination={{
            className: 'custom-pagination'
          }}
          dataSource={filteredData}
          scroll={{ x: 'max-content', y: 500 }}
          columns={columns.map((col) => {
            if (
              col.key.toLowerCase() === 'diachiip' ||
              col.key.toLowerCase() === 'trangthaihoatdong' ||
              col.key.toLowerCase() === 'trangthaiketnoi'||
              col.key.toLowerCase() === 'songuoidung'||
              col.key.toLowerCase() === 'trangthai'
            
            ) {
              return {
                ...col,
                render: col.render
              }
            }
            return {
              ...col,
              ...getColumnSearchProps(col.dataIndex),
              onFilter: (value: string | number | boolean, record: any) =>
                record[col.dataIndex].toString().toLowerCase().includes(value.toString().toLowerCase()),
              render: col.render
            }
          })}
        />
      </Spin>
    </div>
  )
})

export default CustomTable

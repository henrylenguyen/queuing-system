import React, { useCallback } from 'react'
import ExcelJS from 'exceljs'

interface Column {
  title: string
  dataIndex: string
}

interface Props {
  title: string
  columns: Column[]
  headerRowHeight?: number
  filteredData: any[] 
  dataRowHeight?: number
  extraPadding?: number
  fileName?: string
  buttonLabel?: string
  titleRowFontSize?: number
  headerCellFontSize?: number
  dataCellFontSize?: number
  className?: string 
  children?: React.ReactNode 
}

const ExportToExcel: React.FC<Props> = React.memo(
  ({
    title,
    columns,
    headerRowHeight = 24,
    filteredData,
    dataRowHeight = 30,
    extraPadding,
    fileName = 'data.xlsx',
    buttonLabel = 'Export to Excel',
    titleRowFontSize = 20,
    headerCellFontSize = 14,
    dataCellFontSize,
    className, 
    children 
  }) => {
    const exportExcel = useCallback(() => {
      const workbook = new ExcelJS.Workbook()
      const worksheet = workbook.addWorksheet('Sheet 1')

      // Cho tiêu đề chiếm diện tích 1 hàng
      worksheet.mergeCells(1, 1, 1, columns.length)

      // Thêm tiêu đề của bảng
      const titleRow = worksheet.getRow(1)
      titleRow.getCell(1).value = title
      titleRow.getCell(1).font = {
        bold: true,
        size: titleRowFontSize
      }
      titleRow.getCell(1).alignment = {
        vertical: 'middle',
        horizontal: 'center'
      }
      titleRow.height = headerRowHeight // Tạo chiều cao cho tiêu đề

      // Tạo header cho bảng
      columns.forEach((column, index) => {
        const headerCell = worksheet.getCell(2, index + 1)
        headerCell.value = column.title
        headerCell.font = {
          bold: true,
          size: headerCellFontSize
        }
        headerCell.alignment = {
          vertical: 'middle',
          horizontal: 'center'
        }
        headerCell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
        worksheet.getRow(2).height = headerRowHeight // Tạo chiều cao cho header
      })

      // Thêm dữ liệu cho bảng
      filteredData.forEach((item, rowIndex) => {
        columns.forEach((column, colIndex) => {
          const dataIndex = column.dataIndex
          const cell = worksheet.getCell(rowIndex + 3, colIndex + 1)
          cell.value = item[dataIndex]
          cell.alignment = {
            vertical: 'middle',
            horizontal: 'center'
          }
          cell.font = {
            size: dataCellFontSize
          }
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          }
        })
        worksheet.getRow(rowIndex + 3).height = dataRowHeight! // tạo chiều cao cho các cột data
      })

      // Tự động dãn cột để hiển thị nội dung
      worksheet.columns.forEach((column) => {
        if (column && column.eachCell) {
          // Check if column and eachCell method are defined
          column.width = 30 // Tạo độ dài của column
          let maxCellWidth = 0
          column.eachCell({ includeEmpty: true }, (cell) => {
            const cellWidth: number = cell.value ? String(cell.value).length : 0
            maxCellWidth = Math.max(maxCellWidth, cellWidth)
          })
          column.width = Math.min(maxCellWidth, 30) + (extraPadding ?? 1) // Thêm đệm 2 bên
        }
      })

      // Tạo tên file và xuất file Excel
      workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = fileName
        link.click()
        URL.revokeObjectURL(url)
      })
    }, [
      columns,
      filteredData,
      title,
      headerRowHeight,
      dataRowHeight,
      extraPadding,
      fileName,
      titleRowFontSize,
      headerCellFontSize,
      dataCellFontSize
    ])

    return (
      <button type="button" onClick={exportExcel} className={className}>
        {children}
        {buttonLabel}
      </button>
    )
  }
)

export default ExportToExcel

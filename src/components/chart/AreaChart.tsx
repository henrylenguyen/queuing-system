import React, { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import Select from 'react-select'
interface ApexChartProps {}

interface DataPoint {
  name: string
  data: number[]
}
interface ISelect {
  value: string
  label: string
}
const AreaChart: React.FC<ApexChartProps> = () => {
  const [series, setSeries] = useState<DataPoint[]>([])
  const [options, setOptions] = useState<ApexCharts.ApexOptions>({
    chart: {
      type: 'area',
      height: 350,
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: 'Bảng thống kê',
      align: 'left'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      opposite: true
    },
    legend: {
      horizontalAlign: 'left'
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      }
    }
  })

  useEffect(() => {
    // Sample data
    const data = [
      { name: 'STOCK ABC', data: [30, 40, 35, 50, 49, 60, 70, 91, 125] },
      { name: 'STOCK XYZ', data: [50, 30, 45, 55, 70, 80, 65, 75, 95] }
    ]

    setSeries(data)
    setOptions((prevOptions) => ({
      ...prevOptions,
      labels: data[0].data.map((_, index) => `Label ${index}`)
    }))
  }, [])

  const handleViewBy = (view: string) => {
    let newData: DataPoint[] = []

    switch (view) {
      case 'day':
        newData = [
          { name: 'STOCK ABC', data: [40, 50, 45, 60, 59, 70, 80, 101, 135] },
          { name: 'STOCK XYZ', data: [60, 40, 55, 65, 80, 90, 75, 85, 105] }
        ]
        break
      case 'week':
        newData = [
          { name: 'STOCK ABC', data: [55, 65, 70, 80, 85, 95, 100, 110, 120] },
          { name: 'STOCK XYZ', data: [75, 55, 70, 80, 90, 95, 100, 105, 115] }
        ]
        break
      case 'month':
        newData = [
          { name: 'STOCK ABC', data: [75, 85, 80, 95, 100, 90, 105, 110, 130] },
          { name: 'STOCK XYZ', data: [95, 75, 90, 100, 110, 105, 115, 120, 130] }
        ]
        break
      case 'year':
        newData = [
          { name: 'STOCK ABC', data: [120, 110, 130, 140, 150, 160, 170, 180, 190] },
          { name: 'STOCK XYZ', data: [130, 120, 140, 150, 160, 170, 180, 190, 200, 210, 220] }
        ]
        break
      default:
        // Default case (day)
        newData = [
          { name: 'STOCK ABC', data: [40, 50, 45, 60, 59, 70, 80, 101, 135] },
          { name: 'STOCK XYZ', data: [60, 40, 55, 65, 80, 90, 75, 85, 105] }
        ]
    }

    setSeries(newData)
    setOptions((prevOptions) => ({
      ...prevOptions,
      labels: newData[0].data.map((_, index) => `Label ${index}`)
    }))
  }
  const optionsSelect: ISelect[] = [
    { value: 'day', label: 'Ngày' },
    { value: 'week', label: 'Tuần' },
    { value: 'month', label: 'Tháng' },
    { value: 'year', label: 'Năm' }
  ]

  const handleViewByChange = (selectedOption: any) => {
    if (selectedOption) {
      const view = (selectedOption as ISelect).value
      handleViewBy(view)
    }
  }
  return (
    <div>
      <div id='chart' className='my-10 mr-5 rounded-xl bg-white p-5 shadow-md'>
        <div className='flex gap-3'>
          <div className='flex w-full items-center justify-end gap-3'>
            <h3 className='font-bold'>Xem theo</h3>
            <Select options={optionsSelect} onChange={handleViewByChange} />
          </div>
        </div>
        <ReactApexChart options={options} series={series} type='area' height={500} />
      </div>
    </div>
  )
}

export default AreaChart

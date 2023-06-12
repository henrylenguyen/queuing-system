import DateRangePicker from 'components/datetime/DateRange'
import Loading from 'components/loading/Loading'
import PageInfor from 'components/pageInfor/PageInfor'
import CustomTable from 'components/table/CustomTable'
import { IDiary } from 'constants/interface/diary.interface'
import { INumber } from 'constants/interface/number.interface'
import dayjs from 'dayjs'
import moment from 'moment'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDiaries } from 'redux/action/diary/diary.action'
import { fetchReport } from 'redux/action/report/report.action'
import { onChangeDiaryDatePickerReport } from 'redux/slice/diary.slice'
import { onChangeNumberDatePickerReport } from 'redux/slice/report.slice'
import { AppDispatch, RootState } from 'redux/store'
import removeVietnameseTones from 'utils/convertVietnamese'
import getColumnDeviceConfig from 'utils/dataColumn'
// import
type Props = {}

// ---------------------DROPDOWN trạng thái hoạt động--------------------------

const UserLog = (props: Props) => {
  const { diaries, isLoading, selectedDiaryDateRange } = useSelector((state: RootState) => state.diary)
  const [renderCount, setRenderCount] = useState(0) // để gán vào key của table
  const dispatch = useDispatch<AppDispatch>()
  const [filterDataDiary, setFilterDataDiary] = useState<IDiary[]>(diaries)
  //-------------------------GỌI DỮ LIỆU TỪ FIRESTORE-----------------------
  useEffect(() => {
    dispatch(fetchDiaries())
  }, [])

  // --------------------------Lọc tìm kiếm----------------------

const FilterUserDiary = useMemo(() => {
  let filterUserDiary = diaries

  if (selectedDiaryDateRange?.length === 2 && selectedDiaryDateRange[0] !== '' && selectedDiaryDateRange[1] !== '') {
    const startDate = moment(selectedDiaryDateRange[0], 'DD/MM/YYYY HH:mm:ss')
    const endDate = moment(selectedDiaryDateRange[1], 'DD/MM/YYYY HH:mm:ss')

    filterUserDiary = filterUserDiary.filter((diary) => {
      const thoiGianThucHien = moment(diary.thoiGianThucHien, 'DD/MM/YYYY HH:mm:ss')

      return thoiGianThucHien.isBetween(startDate, endDate, undefined, '[]')
    })
  }

  return filterUserDiary
}, [diaries, selectedDiaryDateRange])

  // ---------------TĂNG ĐẾM ĐỂ GÁN VÀO KEY VÀ GÁN LẠI GIÁ TRỊ-----------------
  useEffect(() => {
    setFilterDataDiary(FilterUserDiary) // Cập nhật state khi danh sách thiết bị thay đổi
    setRenderCount((prevCount) => prevCount + 1)
  }, [FilterUserDiary])

  //------------------------------SỬ LÝ BẢNG----------------------------------
  // 1. Lấy ra tất cả các key của object
  const getKeys = useCallback(() => {
    if (diaries && diaries?.length > 0) {
      return Object.keys(diaries[0])
    } else {
      return []
    }
  }, [diaries])

  /* 2. Từ những key của object biến nó thành 1 mảng các đối tượng 
  
*/
  const getDataIndexKey = useCallback(() => {
    const keys = getKeys()

    return keys?.map((item) => {
      return {
        dataIndex: item,
        key: item
      }
    })
  }, [getKeys])
  const dataIndexKey = getDataIndexKey()

  // 3. Tạo ra mảng title chứa các đối tượng title khác nhau, do mình nhập
  const dataTitle = ['Tên đăng nhập', 'Thời gian thực hiện', 'IP thực hiện', 'Thao tác thực hiện']

  const columns = dataTitle.map((title) => {
    // biến chữ tiếng việt có dấu thành không dấu
    const removeTone = removeVietnameseTones(title)
    /* Loại bỏ hết các khoảng trống ở giữa và biến thành in thường
   ví dụ: Mã lịch chiếu ->malichchieu
  */
    const newTitle = removeTone.replace(/\s+/g, '').toLowerCase()
    // dùng hàm find để tìm từ mảng các đối tượng dataIndexKey, so sánh giữa key với newTitle phía trên. Lưu ý là phải chuyển về in thường để so sánh
    const dataIndexKeyItem = dataIndexKey.find((item) => item?.key.toLowerCase() === newTitle)

    // trả về mảng các đối tượng
    return getColumnDeviceConfig(title, dataIndexKeyItem, newTitle)
  })

  const handleTimePickerChange = useCallback(
    (data: any) => {
      const formattedDates = data?.map((date: Date) => dayjs(date).format('DD/MM/YYYY HH:mm:ss'))
      dispatch(onChangeDiaryDatePickerReport(formattedDates))
    },
    [dispatch]
  )

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='pt-10 '>
          <PageInfor />
          <div className='flex h-full p-10 pt-14  '>
            <div className=' flex   flex-col justify-between overflow-hidden'>
              <div>
                <div className='mt-10 flex justify-between gap-5'>
                  <div className='flex justify-between gap-5'>
                    <div className='flex  flex-col gap-2'>
                      <span className='font-semibold'>Chọn thời gian</span>
                      <div>
                        <DateRangePicker
                          handleChange={handleTimePickerChange}
                          placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
                          className='h-[38px]'
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {diaries.length > 0 ? (
                  <CustomTable key={renderCount} data={filterDataDiary} columns={columns} Key={'tenDangNhap'}></CustomTable>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UserLog

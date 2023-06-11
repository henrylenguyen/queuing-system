import * as yup from 'yup'
export const NumberShema = yup
  .object({
    email: yup.string().email('Email phải có định dạng example@abc.com'),
    nguonCap: yup.string().required('Nguồn cấp là bắt buộc'),
    soDienThoai: yup
      .string()
      .required('Số điện thoại là bắt buộc')
      .matches(/^(\+84|0)(3|5|7|8|9)\d{8}$/, {
        message: 'Số điện thoại không đúng định dạng'
      }),
    tenDichVu: yup.string().required('Tên dịch vụ là bắt buộc'),
    tenKhachHang: yup
      .string()
      .required('Họ tên khách hàng là bắt buộc')
      .matches(
        /^[a-zA-ZêÊĐĂăâÂẠẤấẮắẦầẨẩẬậạẹẸơƠờỜởỞợÍíỊịÚụúÙùủỦỤƯưỨứỪừỬửỰựỢặẶẰằẲẳÊêỂểỀềỆệễỄẾếđàáäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
        { message: 'Họ và tên khách hàng không được chứa số và ký tự đặc biệt' }
      )
  })
  .required()

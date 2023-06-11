import * as yup from 'yup'
export const UsernameShema = yup
  .object({
    taiKhoan: yup.string().required('Tài khoản là bắt buộc'),
    matKhau: yup.string().required('Mật khẩu là bắt buộc'),
    nhapLaiMatKhau: yup
      .string()
      .required('Nhập lại mật khẩu là bắt buộc!')
      .oneOf([yup.ref('matKhau')], 'Mật khẩu nhập lại không đúng!'),
    hoTen: yup
      .string()
      .required('Họ tên là bắt buộc')
      .matches(
        /^[a-zA-ZêÊĐĂăâÂẠẤấẮắẦầẨẩẬậạẹẸơƠờỜởỞợÍíỊịÚụúÙùủỦỤƯưỨứỪừỬửỰựỢặẶẰằẲẳÊêỂểỀềỆệễỄẾếđàáäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
        { message: 'Họ và tên không được chứa số và ký tự đặc biệt' }
      ),
    email: yup.string().required('Email là bắt buộc').email('Email phải có định dạng example@abc.com'),
    soDienThoai: yup
      .string()
      .required('Số điện thoại là bắt buộc')
      .matches(/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/, {
        message: 'Số điện thoại không đúng định dạng'
      }),
    vaiTro: yup.string().required('Vai trò là bắt buộc'),
    trangThaiHoatDong: yup.string().required('Tình trạng hoạt động là bắt buộc')
  })
  .required()

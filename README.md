# Dự án Queusing system
> Ngày bắt đầu làm dự án: 15/05/2023


💁‍♂️: Dự án thực tập công ty Alta Media. 


## 🖥️ Các tính năng có trong dự án

####  💠Đăng nhập
####  💠Dashboard
####  💠Thiết bị
####  💠Dịch vụ
####  💠Cấp số
####  💠Báo cáo
####  💠Quản lý vai trò
####  💠Quản lý tài khoản
####  💠Nhật ký hệ thống


## :bulb: Chi tiết từng tính năng

###  💠Phần đăng nhập:

#### Đăng nhập hệ thống

> Tại đây sẽ được validate trường hợp người dùng bỏ trống mà bấm nút đăng nhập. <br/> Ngoài ra nếu không phải là admin thì sẽ không được đăng nhập hệ thống

```
 Tài khoản admin: AdminThai / Admin@1234 <br/>
 Tài khoản Khách Hàng: khachHang1 / KhachHang1@
```


![image](https://github.com/henrylenguyen/queuing-system/assets/114068860/ca95525b-51ae-4ed0-a1e3-d713b77aadcb)

> Nếu bạn nhập sai tài khoản (tài khoản không có trong hệ thống) thì sẽ có thông báo: `Tài khoản không hợp lệ`. <br/>
> Nếu mật khẩu bạn nhập sai sẽ được thông báo: `Mật khẩu không hợp lệ`. <br/>
> Nếu bạn không phải là quản trị sẽ được thông báo: `Bạn không đủ quyền để đăng nhập`.

#### Quên mật khẩu

Khi bạn quên mật khẩu để vào hệ thống. Đừng lo, hệ thống sẽ cho phép bạn đổi mật khẩu dựa vào ***email đăng ký***

![image](https://github.com/henrylenguyen/queuing-system/assets/114068860/a9c8b73a-0e6f-4e22-a147-7a02a4a5edf6)



> Hệ thống sẽ kiểm tra email có tồn tại và hợp lệ hay không. Nếu email hợp lệ sẽ xuất thông báo `Đã xác nhận email` sau đó sẽ cho phép bạn đổi mật khẩu, ngược lại sẽ có thông báo lỗi `Email không hợp lệ`

Tại đây cũng sẽ có kiểm tra dữ liệu nhập có đúng với định dạng email hay không
![image](https://github.com/henrylenguyen/queuing-system/assets/114068860/5720ca5f-2e43-4511-a9a9-dcdd9c62abf6)


#### Đổi mật khẩu

 Phần đổi mật khẩu này có kiểm tra nội dung nhập vào, mật khẩu an toàn nhất là mật khẩu đầy đủ các yếu tố như: in thường, in hoa, ký tự đặt biệt và số <br/>
Bạn đừng lo, mật khẩu của bạn sẽ được mã hóa.😎


> Tại đây có sử dụng mã hóa bcrypt. Một loại mã hóa đứng đầu về độ bảo mật hiện nay. Bởi vì mật khẩu tuy giống nhau nhưng chuỗi đã mã hóa **luôn luôn khác nhau.**
![image](https://github.com/henrylenguyen/queuing-system/assets/114068860/4c89130a-d912-4f24-ad16-e3cd37e7623e)

#### Thông tin cá nhân

> Sau khi bạn đăng nhập thành công, hệ thống sẽ chuyển bạn vào trang cá nhân. Tại đây sẽ bao gồm toàn bộ các thông tin của bạn

 ID của người dùng đăng nhập sẽ được lưu vào LocalStorage, nên đảm bảo rằng sẽ không xảy ra lỗi khi tải lại trang. Dựa vào ID sẽ gửi lên server và cập nhật lại thông tin trong hệ thống. <br/>

 Nếu bạn xóa dữ liệu trong LocalStorage thì lập tức bạn sẽ quay về trang đăng nhập hoặc khi bạn bấm đăng xuất

![image](https://github.com/henrylenguyen/queuing-system/assets/114068860/96faa219-cc61-462d-9501-6d749b9645b0)



# Cấu trúc thư mục của reactjs

- **assets:** Nơi chứa các mục ảnh, âm thanh, videos....
- **components:** Nơi chứa các components tái sử dụng trong dự án
- **constants:** Nơi chứa các type, constant
- **hooks:** Nơi chứa các hook, custom hook
- **layouts:** Nơi chứa layout khác
- **pages:** Nơi chứa các của pages, ví dụ: Home, Contact,...
- **redux:** Nơi chứa các mục redux của dự án
  - Slice là mục chứa các tệp liên quan đến redux toolkit
- **utils:** Nơi chứa các hàm xử lý logic chung
- **schemas:** Nơi chứa schema dùng để xử lý validation
- **thunks:** Nơi chứa các thunk của dự án

# Hướng dẫn khởi chạy dự án

### Khởi chạy dự án reactjs:

```
1. Mở terminal
2. yarn start

```

# Hướng dẫn khởi tạo dự án typeScript

### Bước 1: Cài đặt dự án bằng yarn (sử dụng yarn nhanh)

```bash
  yarn create react-app my-app --template typescript

```

### Bước 2: Cài đặt các config

- ESLint: linter (bộ kiểm tra lỗi) chính

- Prettier: code formatter chính

- @typescript-eslint/eslint-plugin: ESLint plugin cung cấp các rule cho Typescript

- @typescript-eslint/parser: Parser cho phép ESLint kiểm tra lỗi Typescript.

- eslint-config-prettier: Bộ config ESLint để vô hiệu hóa các rule của ESLint mà xung đột với Prettier.

- eslint-plugin-import: Để ESLint hiểu về cú pháp `import...` trong source code.

- eslint-plugin-jsx-a11y: Kiểm tra các vấn đề liên quan đến accessiblity (Tính thân thiện website, ví dụ cho thiết bị máy đọc sách).

- eslint-plugin-react: Các rule ESLint cho React

- eslint-plugin-prettier: Dùng thêm 1 số rule Prettier cho ESLint

- prettier-plugin-tailwindcss: Sắp xếp class tailwindcss

- eslint-plugin-react-hooks: ESLint cho React hook

Chạy câu lệnh dưới đây

```bash
yarn add eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-prettier prettier-plugin-tailwindcss eslint-plugin-react-hooks eslint-plugin-import -D
```

### Bước 3: Cấu hình eslint

- Mở **package.json** tại phần **"script"** thêm:

```bash
    "lint": "eslint --ext ts,tsx src/",
    "lint:fix": "eslint --fix --ext ts,tsx src/",
    "prettier": "prettier --check \"src/**/(*/.tsx|*.ts|*.css|*.scss)\"",
    "prettier:fix": "prettier --write \"src/**/(*/.tsx|*.ts|*.css|*.scss)\""

```

=> Đây là cú pháp check và sửa lỗi của eslint và prettier

### Bước 4: Tạo file .prettierrc ngoài global dự án và cấu hình như dưới

```json
 {
 "arrowParens": "always",
 "semi": false,
 "trailingComma": "none",
 "tabWidth": 2,
 "endOfLine": "auto",
 "useTabs": false,
 "singleQuote": true,
 "printWidth": 120,
 "jsxSingleQuote": true
}

```

### Cụ thể, cấu hình này bao gồm:

```


arrowParens: "always": Luôn bao quanh các tham số của hàm mũi tên bằng dấu ngoặc đơn.
semi: false: Không sử dụng dấu chấm phẩy để kết thúc câu lệnh.
trailingComma: "none": Không sử dụng dấu phẩy cuối cùng trong các cấu trúc dữ liệu như mảng hoặc đối tượng.
tabWidth: 2: Sử dụng khoảng cách bằng 2 để thay thế cho kí tự tab.
endOfLine: "auto": Tự động chọn phương thức xuống dòng phù hợp với hệ điều hành mà file đang được lưu trữ trên.
useTabs: false: Sử dụng khoảng cách thay vì kí tự tab để thụt lề.
singleQuote: true: Sử dụng dấu ngoặc đơn để bao quanh các chuỗi.
printWidth: 120: Giới hạn chiều dài của mỗi dòng mã nguồn là 120 kí tự.
jsxSingleQuote: true: Sử dụng dấu ngoặc đơn để bao quanh các chuỗi trong JSX.

```

### Bước 5: Tạo file .eslintrc ngoài global dự án và cấu hình như dưới:

```json
{
 "extends": ["react-app","prettier"],
 "plugins": ["react","prettier"],
 "rules": {
   "prettier/prettier":[
     "warn",
     {
       "arrowParens": "always",
       "semi": false,
       "trailingComma": "none",
       "tabWidth": 2,
       "endOfLine": "auto",
       "useTabs": false,
       "singleQuote": true,
       "printWidth": 120,
       "jsxSingleQuote": true
     }
   ]
 }
}
```

### Bước 6: Tạo file .editorconfig để cấu hình IDE

```js
[*]
index_size = 2
indent_style = space

```

### Bước 7: Tạo file `.eslintignore`

```json
node_modules/
dist/
```
### Bước 8: Tạo file `.prettierignore`

```json
node_modules/
dist/
```

### Với cấu hình trên, các quy tắc được thiết lập như sau:

```


[*]: Áp dụng tất cả các quy tắc định dạng cho tất cả các tệp trong dự án.
index_size = 2: Kích thước của các chỉ mục trong file sẽ là 2.
indent_style = space: Thụt lề sẽ sử dụng khoảng trắng thay vì tab.
```

### Bước 9: Mở file `tsconfig.json` thêm cấu hình dưới để thuận tiện cho việc import

```js
"baseUrl": "src"
```

# Check các lỗi bằng lint và prettier

### Tìm kiếm các lỗi

```
yarn lint
```

### Fix nhanh các lỗi

```
yarn lint:fix
```

# Cài đặt các thư viện cần thiết

## Tailwindcss

```bash
yarn add -D tailwindcss postcss autoprefixer
yarn tailwindcss init

```

## Cấu hình tailwindcss

### Bước 1: vào tailwind.config.js thêm đoạn dưới

```bash
content: ['./src/**/*.{js,jsx,ts,tsx}'],

```

### Bước 2: Cài thư viện sass vào để có thể biến file .css thành .scss

```bash
yarn add sass node-sass

```

### Bước 3: đổi đuôi index.css thành index.scss và import code dưới:

```bash
@tailwind base;
@tailwind components;
@tailwind utilities;

```

## Config prettier tailwindcss

```bash
yarn add -D prettier-plugin-tailwindcss
```

## Redux toolkit

```bash
yarn add @reduxjs/toolkit react-redux

```


## install react-router-dom (thư viện hỗ trợ về router)

```bash
  yarn add react-router-dom
```




## install react-hook-form (quản lý form)

```bash
  yarn add react-hook-form
```

## install yup hook-form (validate với yup dành cho react-hook-form)

```bash
  yarn add @hookform/resolvers yup
```


## install material UI

```bash
  yarn add @mui/material @emotion/react @emotion/styled
```

## @mui/icons-material (thư viện icon của MUI)

```bash
  yarn add @mui/icons-material
```

## install Ant Design

```bash
  yarn add antd
```



# install momentJS (Format lại date)

```bash
  yarn add moment
```


## react-select (thư viện hỗ trợ dropdown)

```bash
yarn add react-select

```



## date-fns (đăng kí vùng)

```bash
  yarn add date-fns
```

## @mui/lab

```bash
yarn add @mui/lab
```

## @mui/x-date-pickers

```bash
  yarn add @mui/x-date-pickers
```
## react-chartjs (thư viện vẽ biểu đồ)

```bash
  yarn add --save chart.js react-chartjs-2
```

## react-highlight-words (đánh dấu từ)

```bash
  yarn add react-highlight-words
```

## react-apexcharts (thư viện vẽ biểu đồ)

```bash
  yarn add react-apexcharts apexcharts
```


## usehooks-ts (thư viện để sử dụng các hook khác)

```bash
  yarn add usehooks-ts
```

## UUID (thư viện tự sinh id)

```bash
yarn add uuid @type/uuid
```
## react-to-print (thư viện in)

```bash
yarn add react-to-print


```
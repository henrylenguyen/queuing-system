import DashBoardLayout from 'layouts/dashboard/DashBoardLayout'
import { useRoutes } from 'react-router-dom'
import ProfilePage from '../pages/auth/ProfilePage'
import LoginPage from 'pages/auth/LoginPage'
import ResetPassPage from 'pages/auth/ResetPassPage'
import Dashboard from 'pages/dashboard/DashboardPage'
import DeviceListPage from 'pages/device/DeviceListPage'
import ServiceListPage from 'pages/service/ServiceListPage'
import NumberListPage from 'pages/number/NumberListPage'
import ReportPage from 'pages/report/ReportPage'
import AddDevicePage from 'pages/device/AddDevicePage'
import DeviceDetailPage from 'pages/device/DeviceDetailPage'
import UpdateDevicePage from 'pages/device/UpdateDevicePage'
import AddServicePage from 'pages/service/AddServicePage'
import ServiceDetailPage from 'pages/service/ServiceDetailPage'
import AddNumberPage from 'pages/number/AddNumberPage'
import UpdateServicePage from 'pages/service/UpdateServicePage'
import NumberDetailPage from 'pages/number/NumberDetailPage'
import RoleListPage from 'pages/role/RoleListPage'
import AddRolePage from 'pages/role/AddRolePage'
import AddUsernamePage from 'pages/username/AddUsernamePage'
import UsernameListPage from 'pages/username/UsernameListPage'
import UpdateUsernamePage from 'pages/username/UpdateUsernamePage'
import UserLog from 'pages/userLog/UserLog'
import AddNumberPageLogin from 'pages/number/AddNumberPageLogin'
export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/',
      element: (
        <DashBoardLayout>
          <ProfilePage />
        </DashBoardLayout>
      )
    },
    {
      path: '/login/reset-password',
      element: <ResetPassPage />
    },
    {
      path: '/dashboard',
      element: (
        <DashBoardLayout>
          <Dashboard />
        </DashBoardLayout>
      )
    },
    {
      path: '/device/device-list',
      element: (
        <DashBoardLayout>
          <DeviceListPage />
        </DashBoardLayout>
      )
    },
    {
      path: '/device/device-list/add-new-device',
      element: (
        <DashBoardLayout>
          <AddDevicePage />
        </DashBoardLayout>
      )
    },
    {
      path: '/device/device-list/device-detail',
      element: (
        <DashBoardLayout>
          <DeviceDetailPage />
        </DashBoardLayout>
      )
    },
    {
      path: '/device/device-list/update-device',
      element: (
        <DashBoardLayout>
          <UpdateDevicePage />
        </DashBoardLayout>
      )
    },
    {
      path: '/service/service-list',
      element: (
        <DashBoardLayout>
          <ServiceListPage />
        </DashBoardLayout>
      )
    },
    {
      path: '/service/service-list/add-new-service',
      element: (
        <DashBoardLayout>
          <AddServicePage />
        </DashBoardLayout>
      )
    },
    {
      path: '/service/service-list/update-service',
      element: (
        <DashBoardLayout>
          <UpdateServicePage />
        </DashBoardLayout>
      )
    },
    {
      path: '/service/service-list/service-detail',
      element: (
        <DashBoardLayout>
          <ServiceDetailPage />
        </DashBoardLayout>
      )
    },
    {
      path: '/number/number-list',
      element: (
        <DashBoardLayout>
          <NumberListPage />
        </DashBoardLayout>
      )
    },
    {
      path: '/number/number-list/add-new-number',
      element: (
        <DashBoardLayout>
          <AddNumberPageLogin />
        </DashBoardLayout>
      )
    },
    {
      path: '/number/number-list/add-new-number-without-infor',
      element: (
        <DashBoardLayout>
          <AddNumberPage />
        </DashBoardLayout>
      )
    },
    {
      path: '/number/number-list/number-detail',
      element: (
        <DashBoardLayout>
          <NumberDetailPage />
        </DashBoardLayout>
      )
    },
    {
      path: '/report/report-list',
      element: (
        <DashBoardLayout>
          <ReportPage />
        </DashBoardLayout>
      )
    },
    {
      path: '/setting/role-manegement',
      element: (
        <DashBoardLayout>
          <RoleListPage />
        </DashBoardLayout>
      )
    },
    {
      path: '/setting/role-manegement/add-role-manegement',
      element: (
        <DashBoardLayout>
          <AddRolePage />
        </DashBoardLayout>
      )
    },
    {
      path: '/setting/account-manegement',
      element: (
        <DashBoardLayout>
          <UsernameListPage />
        </DashBoardLayout>
      )
    },
    {
      path: '/setting/account-manegement/add-new-account',
      element: (
        <DashBoardLayout>
          <AddUsernamePage />
        </DashBoardLayout>
      )
    },
    {
      path: '/setting/account-manegement/update-account',
      element: (
        <DashBoardLayout>
          <UpdateUsernamePage />
        </DashBoardLayout>
      )
    },
    {
      path: '/setting/user-diary',
      element: (
        <DashBoardLayout>
          <UserLog />
        </DashBoardLayout>
      )
    }
  ])
  return routeElement
}

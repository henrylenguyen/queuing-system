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
          <ServiceListPage />
        </DashBoardLayout>
      )
    },
    {
      path: '/number-list',
      element: (
        <DashBoardLayout>
          <NumberListPage />
        </DashBoardLayout>
      )
    },
    {
      path: '/report',
      element: (
        <DashBoardLayout>
          <ReportPage />
        </DashBoardLayout>
      )
    }
  ])
  return routeElement
}

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
      path: '/device-list',
      element: (
        <DashBoardLayout>
          <DeviceListPage />
        </DashBoardLayout>
      )
    },
    {
      path: '/service-list',
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

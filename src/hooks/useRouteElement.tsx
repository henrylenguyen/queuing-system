import DashBoardLayout from 'layouts/dashboard/DashBoardLayout'
import { useRoutes } from 'react-router-dom'
import ProfilePage from '../pages/auth/ProfilePage'
import LoginPage from 'pages/auth/LoginPage'
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
    }
  ])
  return routeElement
}

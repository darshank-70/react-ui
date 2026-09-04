import { createBrowserRouter } from 'react-router-dom';
import RegisterPage from '../features/auth/pages/RegisterPage';
import DashboardPage from '../features/dashboard/pages/DashboardPage';
import LoginPage from '../features/auth/pages/LoginPage';
import ProtectedRoute from './ProtectedRoute';
import AppLayout from './layouts/AppLayout';
import SettingsPage from '../features/settings/SettingsPage';
import UsersPage from '../features/users/UsersPage';
import UserCard from '../features/users/UserCard';
import ReduxQueryTestingPage from '../features/redux-query-testing/pages/ReduxQueryTestingPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  // {
  //   path: '/dashboard',
  //   element: <DashboardPage />,
  // },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: '/dashboard',
            element: <DashboardPage />,
          },
          {
            path: '/users',
            element: <UsersPage />,
            children: [
              {
                path: ':id',
                element: <UserCard />,
              },
            ],
          },
          {
            path: '/settings',
            element: <SettingsPage />,
          },
          {
            path: 'redux',
            element: <ReduxQueryTestingPage />,
          },
        ],
      },
    ],
  },
]);

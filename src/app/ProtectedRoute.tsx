import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';

function ProtectedRoute() {
  const { status } = useAuth();
  console.info('[ProtectedRoute] status:', status);
  if (status == 'loading') {
    return <div>Loading...</div>;
  }
  if (status == 'unauthenticated') {
    return <Navigate to='/login' replace />;
  }
  return <Outlet />;
}
export default ProtectedRoute;

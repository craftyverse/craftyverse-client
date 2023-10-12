import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export const RequireAuthWrapper: React.FC = () => {
  const auth = useAuth();
  const location = useLocation();

  return auth?.currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

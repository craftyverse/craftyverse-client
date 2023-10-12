import { Navigate, Route, Routes } from 'react-router-dom';
import { SigninPage } from './pages/SigninPage';
import { SignupPage } from './pages/SignupPage';
import { UpdatePasswordPage } from './pages/UpdatePasswordPage';
import { LocationSignupPage } from './pages/LocationSignupPage';
import { RouteLayout } from './layout/RouteLayout/RouteLayout';
import { RequireAuthWrapper } from './wrappers/RequireAuthWrapper';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RouteLayout />}>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/updatePassword/:userId" element={<UpdatePasswordPage />} />

        <Route element={<RequireAuthWrapper />}>
          {/* <Route path="/" element={} */}
          <Route path="/register-business-name" element={<LocationSignupPage />} />
        </Route>
        <Route path="/notAuthorised" element={<>Not Authorised</>} />
      </Route>
    </Routes>
  );
};

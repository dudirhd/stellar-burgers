import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { Navigate, useLocation } from 'react-router-dom';
import {
  selectIsAuthed,
  selectUser
} from '../../services/slices/authSlice/authSlice';
import React from 'react';

type ProtectedRouteProps = {
  publicRout?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  children,
  publicRout
}: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthChecked = useSelector(selectIsAuthed);
  const user = useSelector(selectUser);
  if (!isAuthChecked) {
    return <Preloader />;
  }
  if (publicRout && user) {
    const from = location.state?.from || { pathname: '/' };
    const background = location.state?.from?.background || null;
    return <Navigate replace to={from} state={{ background }} />;
  }
  if (!publicRout && !user) {
    return (
      <Navigate
        replace
        to={'/login'}
        state={{
          from: {
            ...location,
            background: location.state?.background,
            state: null
          }
        }}
      />
    );
  }
  return children;
};

import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logoutUserThunk } from '../../services/slices/authSlice/authSlice';
import { deleteCookie } from '../../utils/cookie';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatch(logoutUserThunk())
      .unwrap()
      .then(() => {
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
      });
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};

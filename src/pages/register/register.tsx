import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { registerUserThunk } from '../../services/slices/authSlice/authSlice';
import { setCookie } from '../../utils/cookie';

export const Register: FC = () => {
  const dispatch = useDispatch();

  const [name, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      registerUserThunk({
        email: email,
        name: name,
        password: password
      })
    )
      .unwrap()
      .then((dataResponse) => {
        setCookie('accessToken', dataResponse.accessToken);
        localStorage.setItem('refreshToken', dataResponse.refreshToken);
      });
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={name}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};

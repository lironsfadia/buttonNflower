import { Redirect, Stack } from 'expo-router';

import { useAuth } from '~/contexts/authProvider';

export default function AuthLayout() {
  const { isAuth } = useAuth();

  if (isAuth) {
    return <Redirect href="/" />;
  }

  return <Stack />;
}

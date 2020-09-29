import { useSelector } from 'react-redux';

import { RootState } from 'src/duck';
import { User } from '.';

type CurrentUser = User;

export const currentUser = (): CurrentUser => {
  return useSelector((state: RootState) => state.auth.user) as User;
};

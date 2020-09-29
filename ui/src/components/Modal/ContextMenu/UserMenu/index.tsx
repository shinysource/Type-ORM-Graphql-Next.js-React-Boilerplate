import classNames from 'classnames/bind';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { logoutUserAction } from 'src/duck/auth';
import { useAsyncThunk } from 'src/lib/asyncHooks';

import style from './style.module.scss';

const c = classNames.bind(style);

const UserMenu: React.FC = () => {
  const router = useRouter();
  const [logout] = useAsyncThunk(logoutUserAction, {
    errorTitle: 'Logout Failed',
    rethrowError: true,
    successTitle: 'Logout successfully',
  });

  const handleLogout = async () => {
    await logout();
    router.replace(`/`);
  };

  return (
    <div className={c('context-box')}>
      <div className={c('context-container')}>
        <Link href={'/'}>
          <a className={c('context-item')}> Dashboard</a>
        </Link>
        <span className={c('separator')} />
        <span className={c('context-item')} onClick={handleLogout}>
          Logout
        </span>
      </div>
    </div>
  );
};

export default UserMenu;

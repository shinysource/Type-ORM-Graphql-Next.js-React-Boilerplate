import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import Head from 'next/head';
import { useState } from 'react';
import { MdForum, MdMoreHoriz } from 'react-icons/md';

import ContextMenu from 'src/components/Modal/ContextMenu';
import UserMenu from 'src/components/Modal/ContextMenu/UserMenu';
import FallbackIcon from 'src/containers/FallbackIcon';
import WithUser from 'src/containers/WithUser';
import { currentUser } from 'src/entities/User/selectors';

import style from './style.module.scss';

const c = classNames.bind(style);

interface LayoutProps {
  title: string;
  Header: React.FC;
}

const Index: React.FC<LayoutProps> = (p) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const hideUserMenu = () => setIsUserMenuOpen(false);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  const user = currentUser();

  return (
    <WithUser inverted={false} redirectPath={'/'}>
      <Head>
        <link rel="shortcut icon" href="/assets/images/app-logo.svg" />
        <title>{p.title}</title>
      </Head>

      <div className={c('container')}>
        <div className={c('sidebar')}>
          <div className={c('header')}>
            <Tippy content={user?.name || 'User'}>
              <div className={c('avatar-container')}>
                <span>
                  <FallbackIcon className={c('pic')} name={user?.name || 'User'} />
                </span>
                <span className={c('online-status')} />
              </div>
            </Tippy>

            <ContextMenu
              className={c('user-menu')}
              content={<UserMenu />}
              isOpen={isUserMenuOpen}
              onClose={hideUserMenu}
            >
              <MdMoreHoriz className={c('dot-menu-icon')} onClick={toggleUserMenu} />
            </ContextMenu>
          </div>

          <div className={c('footer')}>
            <span className={c('feddback-container')}>
              <span className={c('feedback-text')}/>
            </span>
          </div>
        </div>

        <div className={c('content')}>
          <div className={c('header-container')}>
            <p.Header />
          </div>

          {p.children}
        </div>
      </div>
    </WithUser>
  );
};

export default Index;

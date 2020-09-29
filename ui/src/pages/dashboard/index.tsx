import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { MdDashboard } from 'react-icons/md';

import NoItemsFound from 'src/components/NoItemsFound';
import config from 'src/config';
import DashboardLayout from 'src/containers/DashboardLayout';

import style from './style.module.scss';

const c = classNames.bind(style);

const Header: React.FC = () => (
  <div className={c('header')}>
    <Tippy content="Add organization">
      <span>Dashboard</span>
    </Tippy>
  </div>
);

const Dashboard = () => (
  <DashboardLayout title={`Dashboard - ${config.appName}`} Header={() => <Header />}>
    <div className={c('not-found-container')}>
      <NoItemsFound
        Icon={MdDashboard}
        message="App's Dashboard yea"
        addItemText="Dasboard page"
        addItemUrl=""
      />
    </div>
  </DashboardLayout>
);

export default Dashboard;

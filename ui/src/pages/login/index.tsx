import classNames from 'classnames/bind';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/duck';

import ResetPassword from 'src/components/ForgetPassword';
import FullPageLayout from 'src/components/FullPageLayout';
import LoginForm from 'src/components/LoginForm';
import Modal from 'src/components/Modal';
import config from 'src/config';
import WithUser from 'src/containers/WithUser';
import { forgetPasswordAction, loginUserAction, sendPasswordResetOTPAction } from 'src/duck/auth';
import { useAsyncThunk } from 'src/lib/asyncHooks';

import style from './style.module.scss';

const c = classNames.bind(style);

const Index = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [login] = useAsyncThunk(loginUserAction, {
    errorTitle: 'Login Failed',
    rethrowError: true,
    successTitle: 'Logged in successfully',
  });

  const [resetPasswordOtp] = useAsyncThunk(sendPasswordResetOTPAction, {
    errorTitle: 'Failed to send OTP',
    rethrowError: true,
    successTitle: 'We will send you an OTP',
  });

  const [resetPassword] = useAsyncThunk(forgetPasswordAction, {
    errorTitle: 'Reset password failed',
    rethrowError: true,
    successTitle: 'Password reset successfully!',
  });

  const handleLogin = async (values: any) => {
    await login(values);
  };

  const handleSendOtp = async (email: string) => {
    await resetPasswordOtp(email);
  };

  const handleResetPassword = async (values: any) => {
    await resetPassword(values);
    setModalOpen(false);
  };

  const user = useSelector((state: RootState) => {
    return state.auth.user;
  });

  return (
    <WithUser inverted={true} redirectPath={user ? '/dashboard' : '/login'}>
      <Head>
        <link rel="shortcut icon" href="/assets/images/app-logo.svg" />
        <title>{`Login - ${config.appName}`}</title>
      </Head>

      <FullPageLayout className={c('container')}>
        <header className={c('header')}>
          <nav>
            <Link href="/">
              <a className={c('brand')}>
                <span>{config.appName}</span>
              </a>
            </Link>
          </nav>
        </header>

        <div className={c('content')}>
          <span className={c('brand-name')}>
            <h4>{config.appName}</h4>
          </span>

          <LoginForm onSubmit={handleLogin} onResetPassword={() => setModalOpen(true)} />
        </div>
        <Modal onClose={() => setModalOpen(false)} isOpen={isModalOpen}>
          <ResetPassword onSendOtp={handleSendOtp} onSubmit={handleResetPassword} />
        </Modal>
      </FullPageLayout>
    </WithUser>
  );
};

export default Index;

import classNames from 'classnames/bind';
import { FormikHelpers } from 'formik';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from 'src/duck';

import FullPageLayout from 'src/components/FullPageLayout';
import SignupForm, { SignUpFormValues } from 'src/components/SingupForm';
import config from 'src/config';
import WithUser from 'src/containers/WithUser';
import { singupUserAction } from 'src/duck/auth';
import { useAsyncThunk } from 'src/lib/asyncHooks';

import style from './index.module.scss';

const c = classNames.bind(style);

const Index = () => {
  const [signup] = useAsyncThunk(singupUserAction, {
    errorTitle: 'Registration Failed',
    rethrowError: true,
    successTitle: 'Registration in successfully',
  });

  const handleSignup = async (values: any, helpers: FormikHelpers<SignUpFormValues>) => {
    try {
      helpers.setSubmitting(true);
      await signup(values);
      helpers.resetForm();
      Router.push(`/dashboard`);
    } catch (err) {
      if (/User already exists/i.test(err.message)) {
        helpers.setFieldError('email', 'A User with same email already exists');
      }
    }
    helpers.setSubmitting(false);
  };

  const user = useSelector((state: RootState) => {
    return state.auth.user;
  });

  return (
    <WithUser inverted={true} redirectPath={user ? '/dashboard' : '/login'}>
      <Head>
        <link rel="shortcut icon" href="/assets/images/app-logo.svg" />
        <title>{`Sign up - ${config.appName}`}</title>
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
          <SignupForm onSubmit={handleSignup} />
        </div>
      </FullPageLayout>
    </WithUser>
  );
};

export default Index;

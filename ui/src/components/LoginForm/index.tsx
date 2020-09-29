import classNames from 'classnames/bind';
import { Formik, FormikProps } from 'formik';
import { useRef, useState } from 'react';
import { KeyboardEvent } from 'react';
import * as Yup from 'yup';

import TextField from 'src/components/Form/TextField';

import style from './style.module.scss';

const c = classNames.bind(style);

const Login: React.FC<FormikProps<LoginFormValues> & { onResetPassword: () => void }> = (p) => {
  const [formStep, setFormStep] = useState<'step1' | 'step2'>('step1');
  const passwordRef = useRef<HTMLInputElement>(null);

  const untouchStep2 = () => {
    p.setTouched({ password: false });
  };

  const gotoNextStep = () => {
    if (formStep === 'step1' && p.values.email && !p.errors.email) {
      setFormStep('step2');
      untouchStep2();

      if (passwordRef.current) {
        passwordRef.current.focus();
      }

      return;
    }

    p.submitForm();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      gotoNextStep();
    }
  };

  const buttonText = p.isSubmitting ? (
    <div className={c({ 'logging-in': p.isSubmitting })}>
      Logging in
      <span />
    </div>
  ) : (
    'Login'
  );

  return (
    <div className={c('container')}>
      <form className={c('form')} onSubmit={p.handleSubmit}>
        <div className={c('title-container')}>
          <h2>Login</h2>
          <span className={c('sub-title')}>Welcome back</span>
        </div>

        <div className={c('email-container', 'field-container')}>
          <span className={c('field-title')}>Email</span>
          <TextField placeholder="enter your email" type="email" name="email" />
        </div>

        <div className={c('password-container', 'field-container')}>
          <span className={c('field-title')}>Password</span>
          <TextField
            inputRef={passwordRef}
            placeholder="*******"
            type="password"
            name="password"
            onkeyDown={handleKeyDown}
            tabIndex={1}
          />
        </div>

        <button
          className={c('save-button')}
          type="button"
          onClick={gotoNextStep}
          disabled={p.isSubmitting}
        >
          {buttonText}
        </button>
      </form>
      <div className={c('reset-password-text')}>
        <span onClick={p.onResetPassword}>Forget password</span>
      </div>
    </div>
  );
};

interface LoginFormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
});

const initialValues = {
  email: '',
  password: '',
};

interface LoginProps {
  onSubmit: (values: LoginFormValues) => void;
  onResetPassword: () => void;
}

const OuterForm: React.FC<LoginProps> = (p) => {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={p.onSubmit}>
      {(formikProps) => Login({ ...formikProps, onResetPassword: p.onResetPassword })}
    </Formik>
  );
};

export default OuterForm;

import classNames from 'classnames/bind';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';

import TextField from 'src/components/Form/TextField';

import style from './style.module.scss';

const c = classNames.bind(style);

const Signup: React.FC<FormikProps<SignUpFormValues>> = (p) => {
  return (
    <div className={c('container')}>
      <form className={c('form')} onSubmit={p.handleSubmit}>
        <div className={c('title-container')}>
          <h2>Sign up</h2>
          <span className={c('sub-title')}>Sing up with our App</span>
        </div>

        <div className={c('email-container', 'field-container')}>
          <span className={c('field-title')}>Email</span>
          <TextField placeholder="Enter email" type="email" name="email" />
        </div>

        <div className={c('name', 'field-container')}>
          <span className={c('field-title')}>Name</span>
          <TextField placeholder="Enter name" type="name" name="name" />
        </div>

        <div className={c('contact', 'field-container')}>
          <span className={c('field-title')}>Contact No</span>
          <TextField placeholder="Enter contact no" type="name" name="contact" />
        </div>

        <div className={c('dob-container', 'field-container')}>
          <span className={c('field-title')}>Date of birth</span>
          <TextField type={'date'} name="dob" placeholder="Enter dob" />
        </div>

        <div className={c('password-container', 'field-container')}>
          <span className={c('field-title')}>Password</span>
          <TextField type="password" name="password" placeholder="Enter Password" />
        </div>

        <button className={c('save-button')} type="submit" disabled={p.isSubmitting}>
          <div className={c({ 'saving-in': p.isSubmitting })}>
            {p.isSubmitting ? 'Saving' : 'Save'}
            <span />
          </div>
        </button>
      </form>

      <div className={c('login')}>
        <Link href="/login">
          <a>
            <span>Already a user, LogIn</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

// ---
export interface SignUpFormValues {
  contact: string;
  email: string;
  name: string;
  dob: string;
  password: string;
}
const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
const validationSchema = Yup.object().shape({
  contact: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, 'to short')
    .required(),
  dob: Yup.date().required(),
  email: Yup.string().email().required('Required'),
  name: Yup.string()
    .min(2, 'Must be 2 characters or more')
    .max(50, 'Must be 50 characters or less')
    .trim()
    .required('Required'),
  password: Yup.string().max(50, 'Must be 50 characters or less').trim().required(),
});

const initialValues = {
  contact: '',
  dob: '',
  email: '',
  name: '',
  password: '',
};

interface SingupProps {
  onSubmit: (values: SignUpFormValues, helpers: FormikHelpers<SignUpFormValues>) => void;
}

const OuterForm: React.FC<SingupProps> = (p) => {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={p.onSubmit}>
      {(formikProps) => Signup({ ...formikProps })}
    </Formik>
  );
};

export default OuterForm;

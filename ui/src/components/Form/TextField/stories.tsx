import { Meta, Story } from '@storybook/react/types-6-0';
import { Formik } from 'formik';
import * as Yup from 'yup';
import React from 'react';

import TextField, { TextFieldProps } from './index';

const Template: Story<TextFieldProps> = (args) => <TextField {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  name: 'normal',
  placeholder: 'Normal state',
};

export const ErrorState = Template.bind({});
ErrorState.args = {
  name: 'error',
  placeholder: 'Error state',
};

export default {
  component: TextField,
  decorators: [
    (Stories) => (
      <div style={{ background: '#16161a', padding: '2em' }}>
        <Formik
          validationSchema={Yup.object({
            error: Yup.string().min(3, 'Must be 3 characters or More').required('Required'),
          })}
          initialValues={{ normal: '', error: '', disabled: '' }}
          onSubmit={() => undefined}
        >
          <Stories />
        </Formik>
      </div>
    ),
  ],
  title: 'TextField',
} as Meta;

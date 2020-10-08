import React from 'react';

import LoginForm from './index';

export default {
  component: LoginForm,
  title: 'LoginForm',
};

const Template = (args: any) => <LoginForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  task: {
    id: '1',
    title: 'Test Task',
    state: 'TASK_INBOX',
    updatedAt: new Date(2018, 0, 1, 9, 0),
  },
};

export const Error = Template.bind({});
Error.args = {
  task: {
    ...Default.args,
    state: 'Error State',
  },
};

import React from 'react';

import { Meta, Story } from '@storybook/react/types-6-0';
import FlashMessage, { FlashMessageProps } from './index';

export default {
  argTypes: {
    body: { control: { type: 'text' } },
    title: { control: { type: 'text' } },
    type: { control: { type: 'select', options: ['error', 'success'] } },
  },
  component: FlashMessage,
  title: 'FlashMessage',
} as Meta;

// We create a “template” of how args map to rendering
const Template: Story<FlashMessageProps> = (args) => (
  <FlashMessage messages={[{ ...args, id: '1' }]} />
);

export const Success = Template.bind({});
Success.args = {
  body: '',
  title: 'Lol',
  type: 'success',
};

export const Error = Template.bind({});
Error.args = { title: 'Some error', type: 'error' };

export const withContent = Template.bind({});
withContent.args = {
  body: 'Your error message',
  title: 'Error',
  type: 'error',
};

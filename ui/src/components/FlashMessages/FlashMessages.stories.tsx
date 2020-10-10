import { storiesOf } from '@storybook/react';
import React from 'react';

import FlashMessage from './index';

storiesOf('Button', module).add('with text', () => {
  return (
    <FlashMessage messages={[{ id: '1', type: 'success', title: 'Lol' }]} onClose={() => null} />
  );
});

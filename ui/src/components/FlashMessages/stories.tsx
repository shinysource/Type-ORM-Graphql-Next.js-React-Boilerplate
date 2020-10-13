import { storiesOf } from '@storybook/react';
import React from 'react';

import FlashMessage from './index';

storiesOf('FlashMessage', module).add('success', () => {
  return (
    <FlashMessage messages={[{ id: '1', type: 'success', title: 'Lol' }]} onClose={() => null} />
  );
});

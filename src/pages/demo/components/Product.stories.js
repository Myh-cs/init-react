import React from 'react';
import { storiesOf } from '@storybook/react';
import Product from './Product';


storiesOf('Page/Home', module).add('Product', () => (
  <div >
    <Product title='Test Product' price={9.99} quantity={6} />
  </div>
));

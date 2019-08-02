import React from 'react';
import { storiesOf } from '@storybook/react';
import Product from './Product';


storiesOf('Product', module).add('default view', () => (
  <div >
    <Product title='Test Product' price={9.99} quantity={6} />
  </div>
));
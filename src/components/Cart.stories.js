import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Cart from './Cart';
const products = [
  {
    id: 1,
    title: 'Product 1',
    price: 9.99,
    quantity: 1
  }
]

const total = "12";

const stories = storiesOf('Cart', module);

stories.add('empty', () => (
  <div>
    <Cart onCheckoutClicked={action('onCheckoutClicked')} />
  </div>
));

stories.add('default view', () => (
  <div >
    <Cart products={products} total={total} onCheckoutClicked={action('onCheckoutClicked')} />
  </div>
));
import React from 'react'
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import ProductsContainer from './ProductsContainer'
import CartContainer from './CartContainer'
import { changeLang } from '../actions';




const App = ({ changeLang }) => (
  <div>
    <h2>Shopping Cart Example</h2>
    <hr />
    <ProductsContainer />
    <hr />
    <CartContainer />
    <hr />
    <FormattedMessage id='name' values={{
      name: <h1 onClick={changeLang} > {'asdasd'}</h1>
    }} />
  </div>
)

export default connect(() => ({}), { changeLang })(App)

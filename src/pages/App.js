import React from 'react'
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import ProductsContainer from './ProductsContainer'
import CartContainer from './CartContainer'
import { changeLang } from '../redux/actions';




const App = ({ changeLang }) => (
  <div>
    <h2>Shopping Cart Example</h2>
    <hr />
    <ProductsContainer />
    <hr />
    <CartContainer />
    <hr />
    <FormattedMessage id='name' values={{
      name: <button onClick={changeLang} > {'国际化'}</button>
    }} />
    <FormattedMessage id="hello" tagName="h2" />
    <FormattedMessage id='hello'>
      {(txt) => (
        <input type="button"value={txt} />
      )}
    </FormattedMessage>
  </div>
)

export default connect(() => ({}), { changeLang })(App)

import React from 'react'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductsContainer from './ProductsContainer'
import CartContainer from './CartContainer'
import { changeLang, sendSocket } from '../redux/actions';


const App = ({ message, changeLang, sendSocket, intl: { formatMessage } }) => (
  <div>
    <input type="button" value='Say Hello to Websocket' onClick={() => sendSocket('Hello')} disabled={message}/>
    <p>websocket返回的消息是：{message}</p>
    <h2>Shopping Cart Example</h2>
    <hr />
    <ProductsContainer />
    <hr />
    <CartContainer />
    <hr />
    {formatMessage({ id: "name" }, { name: '国际化' })}
    <hr/>

    <FormattedMessage id='name' values={{
      name: <button onClick={changeLang} > {'国际化'}</button>
    }} />
    <FormattedMessage id="hello" tagName="h2" />
    <FormattedMessage id='hello'>
      {(txt) => (
        <input type="button" value={txt} />
      )}
    </FormattedMessage>
  </div>
)
App.prototype={
  intl:intlShape.isRequired,
  changeLang:PropTypes.func.isRequired,
  sendSocket: PropTypes.func.isRequired
}

const mapStateToProps = (state) =>({
  message: state.socket.message,
});

export default connect(mapStateToProps, { changeLang, sendSocket })(injectIntl(App));

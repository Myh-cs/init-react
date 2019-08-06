import React from 'react'
import PropTypes from 'prop-types'
import Product from './Product'
import './test.less';
import './test.scss';


const Cart = ({ products, total, onCheckoutClicked }) => {
  const hasProducts = products.length > 0
  const nodes = hasProducts ? (
    products.map(product =>
      <Product
        title={product.title}
        price={product.price}
        quantity={product.quantity}
        key={product.id}
      />
    )
  ) : (
      <em>Please add some products to cart.</em>
    )

  return (
    <div className='test testscss'>
      <h3>Your Cart</h3>
      <div>{nodes}</div>
      <p>Total: &#36;{total}</p>
      <button onClick={onCheckoutClicked}
        disabled={hasProducts ? '' : 'disabled'}>
        Checkout
      </button>
    </div>
  )
}

Cart.propTypes = {
  /**
   * 产品列表
   */
  products: PropTypes.array,
  /**
   * 合计
   */
  total: PropTypes.string,
  /**
   * checkout回调
   */
  onCheckoutClicked: PropTypes.func.isRequired
}
Cart.defaultProps = {
  total: '0',
  products: []
}

export default Cart

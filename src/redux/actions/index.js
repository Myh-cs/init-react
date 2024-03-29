import shop from '../api/shop'
import * as types from '../constants/ActionTypes'

const receiveProducts = products => ({
  type: types.RECEIVE_PRODUCTS,
  products
})

export const getAllProducts = () => dispatch => {
  shop.getProducts(products => {
    dispatch(receiveProducts(products))
  })
}

const addToCartUnsafe = productId => ({
  type: types.ADD_TO_CART,
  productId
})

export const addToCart = productId => (dispatch, getState) => {
  if (getState().products.byId[productId].inventory > 0) {
    dispatch(addToCartUnsafe(productId))
  }
}
export const changeLang = () => (dispatch) => dispatch({
  type: types.SWITCH_LANG
})

export const checkout = products => (dispatch, getState) => {
  const { cart } = getState()

  dispatch({
    type: types.CHECKOUT_REQUEST
  })
  shop.buyProducts(products, () => {
    dispatch({
      type: types.CHECKOUT_SUCCESS,
      cart
    })
    // Replace the line above with line below to rollback on failure:
    // dispatch({ type: types.CHECKOUT_FAILURE, cart })
  })
}


// test
export const gethi = () => () => shop.gethi().then((res) => console.log('hhhhhhhhh',res))

// url = 'http://10.205.20.170:8080/Gradle___IM_war__exploded_/push', options = { withCredentials: true }
export const connectServer = (url = 'ws://10.205.20.170:8080/Gradle___IM_war__exploded_/marco') => ({
  type: types.IM_CONNECT,
  payload: { url }
})

export const sendServer = message => dispatch => {
  dispatch({
    type: types.IM_SEND,
    payload: message
  })
}

export const closeServer = () => dispatch => {
  dispatch({
    type: types.IM_DISCONNECT
  })
}
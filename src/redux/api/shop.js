/**
 * Mocking client-server processing
 */
import _products from './products.json'
import Request from './request'

const TIMEOUT = 100

const gethi = () => {
  Request.post('/posthi', {r:3});
  return Request.get('/hi', { ID: 12345})
}

export default {
  getProducts: (cb, timeout) => setTimeout(() => cb(_products), timeout || TIMEOUT),
  buyProducts: (payload, cb, timeout) => setTimeout(() => cb(), timeout || TIMEOUT),
  gethi
}

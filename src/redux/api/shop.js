/**
 * Mocking client-server processing
 */
import _products from './products.json'
import axios from './request'

const TIMEOUT = 100

const gethi = () => {
  return axios.get('api/hi')
}

export default {
  getProducts: (cb, timeout) => setTimeout(() => cb(_products), timeout || TIMEOUT),
  buyProducts: (payload, cb, timeout) => setTimeout(() => cb(), timeout || TIMEOUT),
  gethi
}

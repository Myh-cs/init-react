import { combineReducers } from 'redux'

const loadAll = () => {
  const context = require.context('@/', true, /\.reducer.js$/)
  let result = {};
  context.keys().forEach(key => {
    result[context(key).default.name] = context(key).default;
  });
  return result
}
export default combineReducers(loadAll());
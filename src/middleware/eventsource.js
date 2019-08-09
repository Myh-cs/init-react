import 'event-source-polyfill'

const createConnection = (url = '', options = {}) => {
  return new EventSource(url, options);
}

export default createConnection;
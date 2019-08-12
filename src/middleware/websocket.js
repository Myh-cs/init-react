const createConnection = (url = '') => {
  return new WebSocket(url);
};

export default createConnection;
import socket from './websocket'

describe('websocket', () => {
  const initialState = {
    message: ''
  }
  it('should provide the initial state', () => {
    expect(socket(undefined, {})).toEqual(initialState)
  })

  it('should handle WEBSOCKET_CLOSE action', () => {
    expect(socket({}, { type: 'WEBSOCKET:CLOSE' })).toEqual({});
  });

  it('should handle WEBSOCKET_MESSAGE action', () => {
    expect(socket(initialState, { type: 'WEBSOCKET:MESSAGE', payload: { data: '3%' }})).toEqual({
      message: '3%'
    })
  });
})
import websocket from './websocket.reducer';

describe('websocket', () => {
  const initialState = {
    message: ''
  }
  it('should provide the initial state', () => {
    expect(websocket(undefined, {})).toEqual(initialState)
  })

  it('should handle IM_CLOSE action', () => {
    expect(websocket({}, { type: 'IM:CLOSE' })).toEqual({});
  });

  it('should handle IM_MESSAGE action', () => {
    expect(websocket(initialState, {
      type: 'IM:MESSAGE',
      payload: { data: '这是测试' }
    })).toEqual({
      message: '这是测试'
    })
  });
});
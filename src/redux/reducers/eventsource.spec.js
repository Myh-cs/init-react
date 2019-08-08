import eventsource from './eventsource';

describe('eventsource', () => {
  const initialState = {
    events: []
  }
  it('should provide the initial state', () => {
    expect(eventsource(undefined, {})).toEqual(initialState)
  })

  it('should handle WEBSOCKET_CLOSE action', () => {
    expect(eventsource({}, { type: 'EVENTSOURCE:CLOSE' })).toEqual({});
  });

  it('should handle WEBSOCKET_MESSAGE action', () => {
    expect(eventsource(initialState, {
      type: 'EVENTSOURCE:MESSAGE',
      payload: { data: '这是测试' }
    })).toEqual({
      events: ['这是测试']
    })
  });
});
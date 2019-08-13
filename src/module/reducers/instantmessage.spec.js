import instantmessage from './instantmessage.reducer';

describe('instantmessage', () => {
  const initialState = {
    message: ''
  }
  it('should provide the initial state', () => {
    expect(instantmessage(undefined, {})).toEqual(initialState)
  })

  it('should handle IM_CLOSE action', () => {
    expect(instantmessage({}, { type: 'IM:CLOSE' })).toEqual({});
  });

  it('should handle IM_MESSAGE action', () => {
    expect(instantmessage(initialState, {
      type: 'IM:MESSAGE',
      payload: { data: '这是测试' }
    })).toEqual({
      message: '这是测试'
    })
  });
});
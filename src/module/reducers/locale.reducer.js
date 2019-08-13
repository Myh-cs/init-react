import {
  SWITCH_LANG,
} from '../constants/ActionTypes'
const initialState = {
  language: 'en'
}

export default function locale(state = initialState, action = {}) {
  switch (action.type) {
    case SWITCH_LANG:
      return {
        ...state,
        language: state.language === 'en' ? 'zh' : 'en'
      }
    default:
      return state
  }
}
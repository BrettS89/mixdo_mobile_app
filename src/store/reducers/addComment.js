import { ADD_COMMENT } from '../actions/action_types';

export default function(state = {}, { type, payload }) {
  switch(type) {

    case 'ADD_C':
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
}

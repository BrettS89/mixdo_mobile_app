import { SEARCH_TODOS } from '../actions/action_types';

export default function(state = {}, { type, payload }) {
  switch(type) {

    case SEARCH_TODOS:
      return {
        ...state,
        payload
      };

    default:
      return state;
  }
}

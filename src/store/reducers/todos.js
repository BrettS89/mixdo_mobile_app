import { GET_TODOS } from '../actions/action_types';

export default function(state = {}, { type, payload }) {
  switch(type) {

    case GET_TODOS:
      return {
        ...state,
        payload
      };

    default:
      return state;
  }
}

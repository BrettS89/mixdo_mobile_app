import { GET_USER_HISTORY } from '../actions/action_types';

export default function(state = {}, { type, payload }) {
  switch(type) {

    case GET_USER_HISTORY:
      return {
        ...state,
        payload
      }

    default:
      return state;
  }
}

import { GET_USER_PROFILE } from '../actions/action_types';

export default function(state = {}, { type, payload }) {
  switch(type) {

    case GET_USER_PROFILE:
      return {
        ...state,
        payload
      }

    default:
      return state;
  }
}

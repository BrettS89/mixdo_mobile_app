import { FIND_USERS_INFINITE } from '../actions/action_types';

export default function(state={}, { type, payload }) {
  switch(type) {

    case FIND_USERS_INFINITE:
      return {
        ...state,
        payload
      }

    default:
      return state;
  }
}

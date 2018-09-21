import { FIND_USERS } from '../actions/action_types';

export default function(state = {}, { type, payload }) {
  switch(type) {

    case FIND_USERS:
      return {
        ...state,
        payload
      };

    default:
      return state;
  }
}

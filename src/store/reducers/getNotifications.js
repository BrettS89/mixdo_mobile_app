import { GET_NOTIFICATIONS } from '../actions/action_types';

export default function(state = {}, { type, payload }) {
  switch(type) {

    case GET_NOTIFICATIONS:
      return {
        ...state,
        payload
      };

    default:
      return state;
  }
}

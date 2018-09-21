import { GET_FOLLOWERS } from '../actions/action_types';

export default function(state = {}, { type, payload }) {
  switch(type) {

    case GET_FOLLOWERS:
      return {
        ...state,
        payload
      };

    default:
      return state;
  }
}

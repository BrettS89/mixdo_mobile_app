import { GET_FOLLOWING } from '../actions/action_types';

export default function(state = {}, { type, payload }) {
  switch(type) {

    case GET_FOLLOWING:
      return {
        ...state,
        payload
      };

    default:
      return state;
  }
}

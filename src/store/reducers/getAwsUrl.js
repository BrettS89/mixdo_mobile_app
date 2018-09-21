import { GET_AWS_URL } from '../actions/action_types';

export default function(state = {}, { type, payload }) {
  switch(type) {

    case GET_AWS_URL:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
}

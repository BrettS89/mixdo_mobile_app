import { LOGIN } from '../actions/action_types';

export default function(state = {}, { type, payload }) {
  switch(type) {

    case LOGIN:
      return {
        payload
      };

    default:
      return state;
  }
}

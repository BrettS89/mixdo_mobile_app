import { INFINITY_DISCOVER } from '../actions/action_types';

export default function(state = {}, { type, payload }) {
  switch(type) {

    case INFINITY_DISCOVER:
      return {
        ...state,
        payload
      };

    default:
      return state;
  }
}

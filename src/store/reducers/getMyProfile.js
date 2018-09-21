import { MY_PROFILE } from '../actions/action_types';

export default function(state = {}, { type, payload }) {
  switch(type) {

    case MY_PROFILE:
      return {
        ...state,
        payload
      };

    default:
      return state;
  }
}

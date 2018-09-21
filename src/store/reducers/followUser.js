import { FOLLOW_USER } from '../actions/action_types';

export default function followUser(state = {}, { type, payload }) {
  switch(type) {

    case FOLLOW_USER:
      return {
        ...state,
        payload
      };

    default:
      return state;
  }
}

import { UNFOLLOW_USER } from '../actions/action_types';

export default function unfollowUser(state = {}, { type, payload }) {
  switch(type) {

    case UNFOLLOW_USER:
      return {
        ...state,
        payload
      };

    default:
      return state;
  }
}

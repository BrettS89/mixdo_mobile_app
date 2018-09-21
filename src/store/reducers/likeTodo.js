import { LIKE_TODO } from '../actions/action_types';

export default function(state = {}, { type, payload }) {
  switch(type) {

    case LIKE_TODO:
      return {
        ...state,
        payload
      };

    default: 
      return state;
  }
}

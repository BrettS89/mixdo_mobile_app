import { FINISH_TODO } from '../actions/action_types';

export default function(state = {}, { type, payload }) {
  switch(type) {

    case FINISH_TODO:
      return {
        ...state,
        payload
      };

    default:
      return state;
  }
}

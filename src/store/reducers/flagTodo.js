import { FLAG_TODO } from '../actions/action_types';

export default function(state = {}, { type, payload }) {
  switch(type) {

    case FLAG_TODO:
      return {
        ...state,
        payload,
      };

    default:
      return state;
  }
}  
  
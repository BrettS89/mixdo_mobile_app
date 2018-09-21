import { SIGNUP } from '../actions/action_types';

export default function(state = {}, { type, payload }) {
  switch(type) {

    case SIGNUP:
      return {
        ...state,
        payload
      };

    default:
      return state;
  } 
} 
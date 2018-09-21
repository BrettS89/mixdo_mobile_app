import { ADD_USER_TODO } from '../actions/action_types';

export default function(state = {}, { type, payload }) {
  switch(type) {

    case ADD_USER_TODO:
      return {
        ...state,
        payload
      };

    default: 
      return state;
  }
}

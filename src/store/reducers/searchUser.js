import { SEARCH_USER } from '../actions/action_types';

export default function(state = {}, { type, payload }) {
  switch(type) {

    case SEARCH_USER:
      return {
        ...state,
        payload
      };

    default: 
      return state;
  }
}

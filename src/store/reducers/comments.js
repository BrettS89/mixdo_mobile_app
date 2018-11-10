import { ADD_COMMENT, GET_COMMENTS, INFINITY_COMMENTS } from '../actions/action_types';

export default function(state = {}, { type, payload }) {
  switch(type) {

    case ADD_COMMENT:
      return {
        ...state,
        ...payload,
      };

    case GET_COMMENTS:
      return {
        ...state,
        ...payload,
      };

    case INFINITY_COMMENTS:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
}

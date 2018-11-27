import { GET_PUBLIC_TODOS } from '../actions/action_types';

export default function(state = {}, { type, payload }) {
  switch(type) {

    case GET_PUBLIC_TODOS:
      return payload.todos;

    default:
      return state;
  }
}

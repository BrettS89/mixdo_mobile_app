import { GET_MY_TODOS } from './action_types';
import { getOnePersonTodos } from '../../lib/api_calls';

export function getMyTodos() {
  const res = getOnePersonTodos();

  return {
    type: GET_MY_TODOS,
    payload: res
  };
}

import { DELETE_USER } from './action_types';
import { apiDeleteUserAndTodos } from '../../lib/api_calls';

export function deleteUser() {
  const res = apiDeleteUserAndTodos();

  return {
    type: DELETE_USER,
    payload: res,
  };
}

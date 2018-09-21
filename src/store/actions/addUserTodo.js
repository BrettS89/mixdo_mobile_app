import { ADD_USER_TODO } from './action_types';
import { apiAddUserTodo } from '../../lib/api_calls';

export function addUserTodo(body) {
  const res = apiAddUserTodo(body);

  return {
    type: ADD_USER_TODO,
    payload: res
  };
}

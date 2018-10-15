import { FLAG_TODO } from './action_types';
import { apiFlagTodo } from '../../lib/api_calls';


export function flagTodo(payload) {
  const res = apiFlagTodo(payload);

  return {
    type: FLAG_TODO,
    payload: res,
  };
}

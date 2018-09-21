import { FINISH_TODO } from './action_types';
import { apiFinishTodo } from '../../lib/api_calls';

export function finishTodo(todo) {
  const res = apiFinishTodo(todo);

  return {
    type: FINISH_TODO,
    payload: res
  };
}

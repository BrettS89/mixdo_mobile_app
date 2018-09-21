import { LIKE_TODO } from './action_types';
import { apiLikeTodo } from '../../lib/api_calls';

export function likeTodo(body) {
  const res = apiLikeTodo(body);

  return {
    type: LIKE_TODO,
    payload: res
  };
}

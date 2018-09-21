import { INFINITY_TODOS } from './action_types';
import { apiGetInifityTodos } from '../../lib/api_calls';

export function infinityTodos(body) {
  const res = apiGetInifityTodos(body);

  return {
    type: INFINITY_TODOS,
    payload: res
  };
}

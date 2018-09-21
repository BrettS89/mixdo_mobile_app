import { GET_TODOS } from './action_types';
import { todos } from '../../lib/api_calls';

export function getTodos() {
  const res = todos();

  return {
    type: GET_TODOS,
    payload: res
  };
}

import { GET_PUBLIC_TODOS } from './action_types';
import { apiGetPublicTodos } from '../../lib/api_calls';

export function getPublicTodos() {
  const res = apiGetPublicTodos();

  return {
    type: GET_PUBLIC_TODOS,
    payload: res,
  };
}

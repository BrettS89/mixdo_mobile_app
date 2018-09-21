import { SEARCH_USER } from './action_types';
import { apiSearchUser } from '../../lib/api_calls';

export function searchUser(name) {
  const res = apiSearchUser(name);

  return {
    type: SEARCH_USER,
    payload: res
  };
}

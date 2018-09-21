import { FIND_USERS_INFINITE } from './action_types';
import { apiFindFriendsInfinite } from '../../lib/api_calls';

export function findUsersInfinite(date) {
  const res = apiFindFriendsInfinite(date);

  return {
    type: FIND_USERS_INFINITE,
    payload: res
  };
}

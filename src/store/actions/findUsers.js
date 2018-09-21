import { FIND_USERS } from './action_types';
import { apiFindFriends } from '../../lib/api_calls';

export async function findUsers() {
  const res = await apiFindFriends();

  return {
    type: FIND_USERS,
    payload: res
  };
}

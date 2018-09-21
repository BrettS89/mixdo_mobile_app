import { UNFOLLOW_USER } from './action_types';
import { apiUnFollowUser } from '../../lib/api_calls';

export function unfollowUser(body) {
  const res = apiUnFollowUser(body);

  return {
    type: UNFOLLOW_USER,
    payload: res
  };
}
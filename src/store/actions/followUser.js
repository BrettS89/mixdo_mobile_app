import { FOLLOW_USER } from './action_types';
import { apiFollowUser } from '../../lib/api_calls';

export function followUser(body) {
  const res = apiFollowUser(body);

  return {
    type: FOLLOW_USER,
    payload: res
  };
}
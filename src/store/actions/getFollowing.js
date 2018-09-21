import { GET_FOLLOWING } from './action_types';
import { apiGetFollowing } from '../../lib/api_calls';

export function getFollowing() {
  const res = apiGetFollowing();

  return {
    type: GET_FOLLOWING,
    payload: res
  };
}

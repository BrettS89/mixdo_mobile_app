import { GET_FOLLOWERS } from './action_types';
import { apiGetFollowers } from '../../lib/api_calls';

export function getFollowers(type) {
  const res = apiGetFollowers(type);

  return {
    type: GET_FOLLOWERS,
    payload: res
  };
}

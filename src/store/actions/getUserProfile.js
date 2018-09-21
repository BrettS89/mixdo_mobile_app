import { GET_USER_PROFILE } from './action_types';
import { apiGetUserProfile } from '../../lib/api_calls';

export function getUserProfile(id) {
  const res = apiGetUserProfile(id);

  return {
    type: GET_USER_PROFILE,
    payload: res
  };
}

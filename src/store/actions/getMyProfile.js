import { MY_PROFILE } from './action_types';
import { apiGetMyProfile } from '../../lib/api_calls';

export function getMyProfile() {
  const res = apiGetMyProfile();

  return {
    type: MY_PROFILE,
    payload: res
  };
}

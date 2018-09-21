import { GET_NOTIFICATIONS } from './action_types';
import { apiGetNotifications } from '../../lib/api_calls';

export function getNotifications() {
  const res = apiGetNotifications();

  return {
    type: GET_NOTIFICATIONS,
    payload: res
  };
}

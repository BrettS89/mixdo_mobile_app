import { GET_USER_HISTORY } from './action_types';
import { apiGetUserHistory } from '../../lib/api_calls';

export function getUserHistory() {
  const res = apiGetUserHistory();

  return {
    type: GET_USER_HISTORY,
    payload: res
  };
}

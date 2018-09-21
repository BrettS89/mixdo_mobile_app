import { LOGIN } from './action_types';
import { userLogin } from '../../lib/api_calls';

export function login(body) {
  const res = userLogin(body);

  return {
    type: LOGIN,
    payload: res
  };
}

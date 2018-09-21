import { SIGNUP } from './action_types';
import { userSignup } from '../../lib/api_calls';

export function signup(body){
  const res = userSignup(body);

  return {
    type: SIGNUP,
    payload: res
  }
}
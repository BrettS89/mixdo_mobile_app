import { INFINITY_DISCOVER } from './action_types';
import { apiGetInfinityDiscover } from '../../lib/api_calls';

export function infinityDiscover(body) {
  const res = apiGetInfinityDiscover(body);

  return {
    type: INFINITY_DISCOVER,
    payload: res
  };
}

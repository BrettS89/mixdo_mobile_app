import { DISCOVER_TODOS } from './action_types';
import { apiDiscoverTodos } from '../../lib/api_calls';

export function discoverTodos() {
  const res = apiDiscoverTodos();

  return {
    type: DISCOVER_TODOS,
    payload: res
  };
}

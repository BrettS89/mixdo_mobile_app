import { AsyncStorage } from 'react-native';

export const tok = AsyncStorage.getItem('token').then(token => token);
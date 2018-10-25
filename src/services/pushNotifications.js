import { Permissions, Notifications } from 'expo';
import { apiSavePushToken } from '../lib/api_calls';

export default async () => {
  let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if(status === 'granted') {
    const token = await Notifications.getExpoPushTokenAsync();
    try {
      await apiSavePushToken({ token });
    }
    catch(e) {   
    }
  }
};

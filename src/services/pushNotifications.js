import { Permissions, Notifications } from 'expo';
import { apiSavePushToken } from '../lib/api_calls';

// export default async () => {
//   let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//   if(status === 'granted') {
//     const token = await Notifications.getExpoPushTokenAsync();
//     try {
//       await apiSavePushToken({ token });
//     }
//     catch(e) {   
//     }
//   }
// };

export default function() {
  return Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
    if(status === 'granted') {
      Notifications.getExpoPushTokenAsync().then((token) => {
        apiSavePushToken({ token }).then(() => {
          return 'won';
        });
      });  
    }
    return 'lost?';
  }).catch(() => {
    return;
  });
};

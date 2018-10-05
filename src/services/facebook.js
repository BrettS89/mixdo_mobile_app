import { Constants, Facebook } from 'expo';
import axios from 'axios';
import { apiFacebookAuth } from '../lib/api_calls';

export async function doFacebookAuth() {
  try {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync('736979746693999', {
      permissions: ['public_profile', 'email']
    });

    if(type === 'cancel') {
      return;
    }
    
    let { data } = await axios.get(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.type(large)`);
    data.deviceName = Constants.deviceName;
    const result = await apiFacebookAuth(data);
    return result;
  }
  catch(err) {
    alert('There was a problem logging you in');
  }
}
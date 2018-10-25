import React from 'react';
import { View, AsyncStorage } from 'react-native';
import { SplashScreen } from 'expo';
import Colors from '../../shared/colors';
import { apiTest } from '../../lib/api_calls';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    // SplashScreen.preventAutoHide();
    this.bootstrapApp();
  }

  bootstrapApp = async () => {  
    try {
      const token = await AsyncStorage.getItem('token');
      if(token) {
        await apiTest();
        SplashScreen.hide();
        return this.props.navigation.navigate('Activity');
      }
      SplashScreen.hide();
      this.props.navigation.navigate('Login');
    }
    catch(e) {
      SplashScreen.hide();
      this.props.navigation.navigate('Login');
    }     
  };

  componentWillUnmount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.main }}>

      </View>
    );
  }
}

export default Auth;

import React from 'react';
import { View, AsyncStorage } from 'react-native';
import { SplashScreen } from 'expo';
import Colors from '../../shared/colors';
import { apiTest } from '../../lib/api_calls';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    SplashScreen.preventAutoHide();
    this.bootstrapApp();
  }

  bootstrapApp = async () => {  
    try {
      const token = await AsyncStorage.getItem('token');
      if(token) {
        await apiTest();
        return this.props.navigation.navigate('Activity');
      }
      await apiTest();
      this.props.navigation.navigate('PublicTodos');
    }
    catch(e) {
      console.log('wut?');
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

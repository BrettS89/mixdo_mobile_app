import React from 'react';
import { Constants } from 'expo';
import { View, AsyncStorage } from 'react-native';
import { Asset, SplashScreen } from 'expo';
import { doFacebookAuth } from '../../services/facebook';
import { apiTest } from '../../lib/api_calls';
import { styles } from './styles';
import LoginForm from './sub_containers/LoginForm';
import pushNotifications from '../../services/pushNotifications';

class Login extends React.Component {
  state = { error: false };

  componentWillMount() {
    SplashScreen.preventAutoHide();
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');
    if(token) {
      try {
        await apiTest();
        return this.props.navigation.navigate('Activity');
      }
      catch(e) {
        SplashScreen.hide();
        alert('There was a problem connecting to the server :(');
      }     
    }
    SplashScreen.hide();
  }

  async onLogin(email, password) {
    this.setState({ error: false });
    const deviceName = Constants.deviceName;
    await this.props.login({ email, password, deviceName });
    if(this.props.state.login.payload ===  'Got an error') {
      this.setState({ error: true })
    } else {
      await AsyncStorage.setItem('token', this.props.state.login.payload.token);
      this.props.navigation.navigate('main');
    }
  }

  facebookAuth = async () => {
    try {
      const result = await doFacebookAuth();
      console.log(result);
      if(result) {
        await AsyncStorage.setItem('token', result.token);
        if(result.status === 'signup') {
          return this.props.navigation.navigate('FindTodos');
        }
        return this.props.navigation.navigate('main');
      }
    }
    catch(e) {
      console.log(e);
    }
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <LoginForm onLogin={this.onLogin.bind(this)} state={this.props.state} error={this.state.error} navigation={this.props.navigation} facebookAuth={this.facebookAuth}/>
      </View> 
    );
  }
}

export default Login;

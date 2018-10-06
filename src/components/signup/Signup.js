import React from 'react';
import Expo from 'expo';
import { View, AsyncStorage } from 'react-native';
import { doFacebookAuth } from '../../services/facebook';
import { styles } from './styles';
import SignupForm from './sub_components/SignupForm';
import pushNotifications from '../../services/pushNotifications';

class Signup extends React.Component {
  state = { error: false };

  async onSignup(firstName, lastName, email, password) {
    this.setState({ error: false });
    const deviceName = Expo.Constants.deviceName;
    await this.props.signup({ firstName, lastName, email, password, deviceName });
    if(this.props.state.signup.payload ===  'Error') {
      this.setState({ error: true })
    } else {
      await AsyncStorage.setItem('token', this.props.state.signup.payload.token);
      this.props.navigation.navigate('Welcome');
    }
  }

  facebookAuth = async () => {
    try {
      const result = await doFacebookAuth();
      if(result) {
        await AsyncStorage.setItem('token', result.token);
        if(result.status === 'signup') {
          await pushNotifications();
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
        <SignupForm onSignup={this.onSignup.bind(this)} error={this.state.error} navigation={this.props.navigation} facebookAuth={this.facebookAuth}/>
      </View> 
    );
  }
}

export default Signup;
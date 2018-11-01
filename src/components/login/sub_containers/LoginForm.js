import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Input, Spinner } from '../../_shared';
import { styles } from '../styles';
import Colors from '../../../shared/colors';
import Icon from 'react-native-vector-icons/Entypo';
import Chevron from 'react-native-vector-icons/Entypo';
const logo = require('../../../../assets/logoblue.png');

class LoginForm extends React.Component {
  state = { 
    email: '',      
    password: '', 
    loading: false, 
    error: false, 
    email2: '', 
    password2: '',
    button: '', 
  };

  onButtonPress = async () => {
    this.setState({ loading: true, email: '', password: '', button: 'login' });
    await this.props.onLogin(this.state.email, this.state.password);
    this.setState({ loading: false, button: '' });
  };

  showError = () => {
    if(this.props.error) {
      return <Text style={{ color: 'red' }}>Please enter valid credentials</Text>
    } else {
      return <Text></Text>;
    }
  };

  spinnerOrText = () => {
    if(this.state.loading && this.state.button === 'login') {
      return <Spinner size="small" />;
    }
    return <Text style={styles.buttonText}>Login</Text>;
  };

  spinnerOrFacebook = () => {
    if(this.state.loading && this.state.button === 'facebook') {
      return <View style={styles.button}><Spinner size="small" /></View>;
    }
    return (
      <TouchableOpacity style={styles.button} onPress={() => this.pressFacebook()}>
        <Icon name="facebook" size={20} color="#ffffff" style={{ marginRight: 10, paddingTop: 1 }} />
        <Text style={styles.buttonText}>Continue with Facebook</Text>
      </TouchableOpacity> 
    );
  };

  pressFacebook = async () => {
    this.setState({ loading: true, button: 'facebook' });
    await this.props.facebookAuth();
    this.setState({ loading: false, button: '' });
  };

  render() {
    return (
      <View style={styles.loginFormContainer}>

        <View style={styles.logoContainer}>
          <Image source={logo} resizeMode="contain" style={{ width: 150 }} />
          {/* <Text style={styles.logo}>Mixdo</Text> */}
        </View>

        <View style={{ marginTop: 40, marginBottom: 15 }}>
          <View>
            <Input 
              labelText="email"
              email={true}
              placeholder="Email"
              onChangeText={email => this.setState({ email, email2: email })}
              onSubmitHandler={this.onButtonPress}
              />
          </View>  

          <View>
            <Input 
              labelText="password"
              placeholder="Password"
              secureTextEntry
              onChangeText={password => this.setState({ password, password2: password })}
              onSubmitHandler={this.onButtonPress}
              />
          </View> 

          <View>
            {this.showError()}
          </View>

        </View>    

        <View>
          <TouchableOpacity onPress={this.onButtonPress.bind(this)} style={styles.button}>
            {this.spinnerOrText()}
          </TouchableOpacity>  
        </View>

        <View style={{ alignItems: 'center', marginTop: 5, marginBottom: 5 }}>
          <Text>Or</Text>
        </View>  

        <View>
          {this.spinnerOrFacebook()}  
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
          <Text>New to mixdo?</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
            <Text style={{ color: Colors.main, fontWeight: '700' }}> Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.tcContainer}> */}
          <TouchableOpacity style={styles.tcContainer} onPress={() => this.props.tc()}>
            <Text style={styles.tcText}>By signing up or logging in you agree to our 
            <Text style={styles.tcText2}> terms and conditions.</Text>
            </Text>
          </TouchableOpacity>
        {/* </View> */}

      </View>
    );
  }
}

export default LoginForm;

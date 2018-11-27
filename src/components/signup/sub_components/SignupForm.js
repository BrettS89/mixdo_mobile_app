import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Button, Input, Spinner } from '../../_shared';
import { styles } from '../styles';
import Colors from '../../../shared/colors';
import Icon from 'react-native-vector-icons/Entypo';
const logo = require('../../../../assets/logoblue.png');

class SignUpForm extends React.Component {
  state = { 
    firstName: '',
    lastName: '',
    email: '', 
    password: '', 
    loading: false, 
    error: false,
    button: '', 
  };

  onButtonPress = async () => {
    this.setState({ loading: true, button: 'signup' });
    await this.props.onSignup(this.state.firstName, this.state.lastName, this.state.email, this.state.password);
    this.setState({ loading: false, firstName: '', lastName: '', email: '', password: '', button: '' });
  };

  showError = () => {
    if(this.props.error) {
      return <Text style={{ color: 'red' }}>Please enter valid credentials</Text>
    } else {
      return <Text></Text>;
    }
  };

  spinnerOrText = () => {
    if(this.state.loading && this.state.button === 'signup') {
      return <Spinner size="small" />;
    }
    return <Text style={styles.buttonText}>Sign up</Text>;
  }

  spinnerOrFacebook = () => {
    if(this.state.loading && this.state.button === 'facebook') {
      return <View style={styles.button}><Spinner size="small" /></View>;
    }
    return (
      <TouchableOpacity style={styles.button} onPress={() => this.pressFacebook()}>
        <Icon name="facebook" size={20} color="#ffffff" style={{ marginRight: 10, paddingTop: 1 }} />
        <Text style={styles.buttonText}>Sign Up with Facebook</Text>
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
      <View style={styles.signupFormContainer}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('PublicTodos')}>
          <Text style={{ color: Colors.main }}>Back</Text>
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image source={logo} resizeMode="contain" style={{ width: 150 }} />
        </View>

        <View style={{ marginTop: 15, marginBottom: 0 }}>

          <View>
            <Input 
              labelText="firstname"
              placeholder="First name"
              onChangeText={firstName => this.setState({ firstName })}
              onSubmitHandler={this.onButtonPress}
              />
          </View> 

          <View>
            <Input 
              labelText="lastname"
              placeholder="Last name"
              onChangeText={lastName => this.setState({ lastName })}
              onSubmitHandler={this.onButtonPress}
              />
          </View> 

          <View>
            <Input 
              labelText="email"
              email={true}
              placeholder="Email"
              onChangeText={email => this.setState({ email })}
              onSubmitHandler={this.onButtonPress}
              />
          </View>  

          <View>
            <Input 
              labelText="password"
              placeholder="Password"
              secureTextEntry
              onChangeText={password => this.setState({ password })}
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

        <TouchableOpacity style={styles.tcContainer} onPress={() => this.props.tc()}>
            <Text style={styles.tcText}>By signing up or logging in you agree to our 
            <Text style={styles.tcText2}> terms and conditions </Text>
            <Text style={styles.tcText}>and </Text>
            <Text style={styles.tcText2}>privacy policy.</Text>
            </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

export default SignUpForm;

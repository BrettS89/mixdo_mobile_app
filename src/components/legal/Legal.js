import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

class Legal extends React.Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <View style={styles.bodyContainer}>
          <TouchableOpacity style={styles.legalButton} onPress={() => this.props.navigation.navigate('TC')}>
            <Text style={styles.legalText}>Terms and Conditions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.legalButton} onPress={() => this.props.navigation.navigate('PrivacyPolicy')}>
            <Text style={styles.legalText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Legal;

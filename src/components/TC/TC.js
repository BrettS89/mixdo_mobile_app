import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import {styles} from './styles';

class TC extends React.Component {
  render() {
    return (
      <ScrollView style={styles.mainContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.headerText}>Terms and Conditions</Text>
        </View>
        <View style={styles.bodyContainer}>
          <Text>body</Text>
        </View>
      </ScrollView>
    );
  }
}

export default TC;

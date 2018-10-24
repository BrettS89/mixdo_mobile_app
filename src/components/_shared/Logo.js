import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Colors from '../../shared/colors';
const logo = require('../../../assets/logowhite.png');

const Logo = props => {
  return (
    <View style={styles.logoContainer}>
      {/* <Text style={styles.logoText}>Mixdo</Text> */}
      <Image source={logo} resizeMode="contain" style={{ width: 100, alignItems: 'flex-end' }}/>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center'
    // paddingBottom: 15
  },
  logoText: {
    fontSize: 22,
    letterSpacing: 1,
    fontWeight: '600',
    color: Colors.logo,
  }
})

export default Logo;

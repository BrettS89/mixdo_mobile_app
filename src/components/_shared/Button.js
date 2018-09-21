import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../shared/colors';

const Button = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.button, props.style]}>
      <Text style={styles.text}>{props.children}</Text>
    </TouchableOpacity>  
  );
};

export { Button };

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: Colors.main,
    borderRadius: 4,
    height: 40
  },
  text: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 15
  }
});
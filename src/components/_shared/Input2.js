import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

const Input2 = ({ labelText, value, onChangeText, placeholder, secureTextEntry }) => {
  const { label, textInput, container, inputView } = styles;
  return (
    <View style={container}>
      <Text style={label}>{labelText}</Text>
      <View style={inputView}>
      <TextInput
        secureTextEntry={secureTextEntry}
        style={textInput}
        value={value}
        onChangeText={onChangeText}
        autoCorrect={false}
        placeholder={placeholder}
        multiline = {true}
        numberOfLines = {3}
        underlineColorAndroid="transparent"
        textAlignVertical="top"
      />
      </View>
    </View>  
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10
  },
  textInput: {
    color: '#000',
    paddingRight: 3,
    fontSize: 15,
    // lineHeight: ,
    flex: 2,
  },
  inputView: {
    height: 75,
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 2,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: '#eaeaea',
  },
  container: {
    alignSelf: 'stretch',
    height: 100,
    marginBottom: 15
  }
});

export { Input2 };
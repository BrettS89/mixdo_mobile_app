import React from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../shared/colors';

const Input3 = ({ value, onChangeText, placeholder, secureTextEntry, onSearch }) => {
  const { textInput, container } = styles;
  return (
    <View style={container}>
      <TextInput
        secureTextEntry={secureTextEntry}
        style={textInput}
        value={value}
        onChangeText={onChangeText}
        autoCorrect={false}
        placeholder={placeholder}
        autoCapitalize={'none'}
        underlineColorAndroid="transparent"
      />
      <TouchableOpacity style={styles.searchButton} onPress={() => onSearch()}>
        <Text style={styles.searchText}>Search</Text>
      </TouchableOpacity>
    </View>  
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    fontWeight: '500',
    flex: 1
  },
  textInput: {
    color: '#000',
    paddingRight: 3,
    fontSize: 15,
    lineHeight: 23,
    flex: 2
  },
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    // borderBottomWidth: 1,
    // borderBottomColor: '#eaeaea',
  },
  searchButton: {
    marginRight: 25
  },
  searchText: {
    color: Colors.main,
  }
});

export { Input3 };

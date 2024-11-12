// components/InputField.js
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const InputField = ({ placeholder, secureTextEntry, style }) => (
  <TextInput
    style={[styles.input, style]}
    placeholder={placeholder}
    secureTextEntry={secureTextEntry}
    placeholderTextColor="#777"
  />
);

const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    color: '#333',
  },
});

export default InputField;

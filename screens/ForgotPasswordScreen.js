import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const ForgotPasswordScreen = () => {
  return (
    <View style={styles.container}>
      <Text>TODO: Implement password reset</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  logo: {
    marginBottom: 40,
    width: '50%',
    height: '40%',
  },

  inputView: {
    backgroundColor: 'lightblue',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },

  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgotPassword: {
    height: 30,
    marginRight: 10,
  },

  newUser: {
    height: 30,
    marginLeft: 10,
  },

  loginButton: {
    width: '80%',
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 30,
    backgroundColor: 'darkblue',
  },

  loginText: {
    color: '#fff',
  },
});

export default ForgotPasswordScreen;

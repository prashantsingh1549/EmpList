import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {isLogin} from '../redux/Action/EmpAction';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login = () => {
  const dispatch = useDispatch();
  const authData = {username: 'prashantsingh1549@gmail.com', password: '12345'};
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (authData.username == username && authData.password == password) {
      dispatch(isLogin(true));
      await AsyncStorage.setItem('isLogin', JSON.stringify(true));
    } else {
      ToastAndroid.showWithGravity(
        'Username or Password is wrong',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        value={username}
        placeholder="Enter username"
        placeholderTextColor={'#000'}
        onChangeText={val => setUserName(val)}
        style={styles.inputText}
      />
      <TextInput
        value={password}
        placeholder="Enter username"
        placeholderTextColor={'#000'}
        onChangeText={val => setPassword(val)}
        style={styles.inputText}
      />
      <TouchableOpacity
        onPress={() => handleLogin()}
        style={styles.loginButton}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: windowHeight * 0.06,
  },
  inputText: {
    backgroundColor: '#fff',
    width: windowWidth * 0.8,
    borderRadius: 5,
    marginVertical: windowHeight * 0.02,
    paddingLeft: 10,
    color: '#000',
  },
  loginButton: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.07,
    borderRadius: 5,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

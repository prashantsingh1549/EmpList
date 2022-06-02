import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

import {addUser, editUser} from '../redux/Action/EmpAction';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AddUser = ({navigation, ...props}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [index, setIndex] = useState(-1);
  const {listOfEmp} = useSelector(state => state.EmpReducer);
  useEffect(() => {
    handleEditIndex();
  }, []);
  const handleEditIndex = async () => {
    if (props.route.params.user) {
      const index = listOfEmp.findIndex(
        item => item.id == props.route.params.user,
      );
      console.log(index);
      setName(listOfEmp[index].name);
      setLocation(listOfEmp[index].location);
      setCompany(listOfEmp[index].company);
      setType(listOfEmp[index].type);
      setIndex(index);
    }
  };
  //   navigation.navigate('Dashboard')

  const handleNewUser = async () => {
    const data = [...listOfEmp];
    if (index < 0) {
      if (name != '' || company != '' || location != '' || type != '') {
        const newUser = {
          id: Math.random(),
          name: name,
          company: company,
          location: location,
          type: type,
          avatar_url: '',
        };
        dispatch(addUser(newUser));
        data.push(newUser);
        await AsyncStorage.setItem('empList', JSON.stringify(data));
        navigation.navigate('Dashboard');
        setName('');
        setType('');
        setCompany('');
        setLocation('');
      } else {
        ToastAndroid.showWithGravity(
          'Something is missing!!!',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
    } else {
      if (name != '' || company != '' || location != '' || type != '') {
        data[index].name = name;
        data[index].company = company;
        data[index].location = location;
        data[index].type = type;
        dispatch(editUser(data));
        await AsyncStorage.setItem('empList', JSON.stringify(data));
        navigation.navigate('Dashboard');
        setName('');
        setType('');
        setCompany('');
        setLocation('');
      } else {
        ToastAndroid.showWithGravity(
          'Something is missing!!!',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New User</Text>
      <TextInput
        value={name}
        placeholder="Enter name"
        placeholderTextColor={'#000'}
        onChangeText={val => setName(val)}
        style={styles.inputText}
      />
      <TextInput
        value={company}
        placeholder="Enter company name"
        placeholderTextColor={'#000'}
        onChangeText={val => setCompany(val)}
        style={styles.inputText}
      />
      <TextInput
        value={location}
        placeholder="Enter location"
        placeholderTextColor={'#000'}
        onChangeText={val => setLocation(val)}
        style={styles.inputText}
      />
      <TextInput
        value={type}
        placeholder="Enter user type"
        placeholderTextColor={'#000'}
        onChangeText={val => setType(val)}
        style={styles.inputText}
      />
      <TouchableOpacity
        onPress={() => handleNewUser()}
        style={styles.loginButton}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};
export default AddUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: windowHeight * 0.06,
    marginTop: windowHeight * 0.06,
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

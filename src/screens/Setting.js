import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {isLogin, fetchData} from '../redux/Action/EmpAction';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Setting = () => {
  const disptach = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.profileDetails}>
        <Image
          source={require('../assets/profile.jpeg')}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Prashant Singh</Text>
      </View>
      <TouchableOpacity
        onPress={async () => {
          await AsyncStorage.setItem('isLogin', JSON.stringify(false));
          await AsyncStorage.setItem('fetchData', JSON.stringify(false));
          disptach(isLogin(false));
          disptach(fetchData(false));
        }}
        style={styles.logoutButton}>
        <Icon name="logout" size={30} color={'red'} />
        <Text style={[styles.name, {color: 'red', marginLeft: 30}]}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  profileImage: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.3,
    borderRadius: 10,
  },
  profileDetails: {
    alignItems: 'center',
    marginTop: windowHeight * 0.07,
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoutButton: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: windowHeight * 0.08,
  },
});

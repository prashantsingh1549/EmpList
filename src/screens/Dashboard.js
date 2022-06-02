import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {apiData} from '../utils/ApiEndPoint';
import {deleteUser, listOfAllEpm} from '../redux/Action/EmpAction';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BadCharacterList = ({navigation}) => {
  const dispatch = useDispatch();
  const {listOfEmp, isLogin} = useSelector(state => state.EmpReducer);

  useEffect(() => {
    getUserList();
  }, []);
  const getUserList = async () => {
    if (!isLogin) {
      await axios
        .get(apiData.baseUrl)
        .then(async res => {
          dispatch(listOfAllEpm(res.data));
          await AsyncStorage.setItem('empList', JSON.stringify(res.data));
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      const data = await AsyncStorage.getItem('empList');
      if (data) {
        dispatch(listOfAllEpm(JSON.parse(data)));
      } else {
        dispatch(listOfAllEpm([]));
      }
    }
  };
  const handleDelete = async id => {
    dispatch(deleteUser(id));
    const filterData = listOfEmp.filter(item => item.id != id);
    await AsyncStorage.setItem('empList', JSON.stringify(filterData));
  };
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#000"
        barStyle={'light-content'}
        showHideTransition={'slide'}
      />
      {listOfEmp.length > 0 ? (
        <FlatList
          data={listOfEmp}
          keyExtractor={item => item.id}
          numColumns={2}
          renderItem={({item}) => (
            <View style={styles.flatConatiner}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Details', {user: item})}>
                <Image
                  source={
                    item.avatar_url
                      ? {
                          uri: item.avatar_url,
                        }
                      : require('../assets/profile.jpeg')
                  }
                  style={styles.image}
                />
              </TouchableOpacity>
              <View style={styles.textContainer}>
                <Text style={styles.name}>
                  {item.login ? item.login : item.name}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => {
                      item.url
                        ? alert('Unable to update')
                        : navigation.navigate('AddUser', {user: item.id});
                    }}
                    style={{marginRight: 15}}>
                    <Icon name="edit" size={25} color={'blue'} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Icon name="delete" size={25} color={'red'} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}
    </View>
  );
};

export default BadCharacterList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  flatConatiner: {
    marginHorizontal: 15,
    marginVertical: 20,
  },
  image: {
    width: 150,
    height: 180,
    resizeMode: 'stretch',
    borderRadius: 5,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  name: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 10,
  },
  nickname: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});

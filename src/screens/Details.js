import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {useSelector} from 'react-redux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Details = ({...props}) => {
  const [userDetails, setUser] = useState({});

  const {listOfEmp} = useSelector(state => state.EmpReducer);

  useEffect(() => {
    handleUserDetails();
  }, []);
  const handleUserDetails = async () => {
    if (props.route.params.user.url) {
      await axios
        .get(props.route.params.user.url)
        .then(res => {
          setUser(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      const filterData = listOfEmp.find(
        item => item.id == props.route.params.user.id,
      );
      setUser(filterData);
    }
  };
  return (
    <View style={styles.container}>
      {userDetails ? (
        <View>
          <View style={styles.details}>
            <Image
              source={
                userDetails.avatar_url
                  ? {
                      uri: userDetails.avatar_url,
                    }
                  : require('../assets/profile.jpeg')
              }
              style={styles.avatar}
            />
            <Text style={styles.name}>{userDetails.name}</Text>
          </View>
          <View style={{marginTop: 20, marginLeft: 20}}>
            <Text style={styles.name}>Company :</Text>
            <Text style={styles.textDetails}>{userDetails.company}</Text>
          </View>
          <View style={{marginTop: 20, marginLeft: 20}}>
            <Text style={styles.name}>Location :</Text>
            <Text style={styles.textDetails}>{userDetails.location}</Text>
          </View>
          <View style={{marginTop: 20, marginLeft: 20}}>
            <Text style={styles.name}>Type :</Text>
            <Text style={styles.textDetails}>{userDetails.type}</Text>
          </View>
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}
    </View>
  );
};
export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  avatar: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.3,
    borderRadius: 5,
  },
  details: {
    alignItems: 'center',
    marginTop: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  textDetails: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
});

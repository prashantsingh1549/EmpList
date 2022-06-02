import * as React from 'react';
import {Button, Text, View, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Login from './src/auth/Login';
import Dashboard from './src/screens/Dashboard';
import Setting from './src/screens/Setting';
import Details from './src/screens/Details';
import AddUser from './src/screens/AddUser';
import {isLogin} from './src/redux/Action/EmpAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeStack = createNativeStackNavigator();
const Auth = createNativeStackNavigator();

function AuthStackScreen() {
  return (
    <Auth.Navigator>
      <Auth.Screen
        options={{
          headerShown: false,
        }}
        name="Login"
        component={Login}
      />
    </Auth.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function TabBottomScreen() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        options={({navigation, route}) => ({
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTitleStyle: {
            color: '#fff',
            fontSize: 25,
          },
          tabBarLabelStyle: {
            fontSize: 17,
            fontWeight: 'bold',
          },
          headerRight: props => (
            <TouchableOpacity onPress={() => navigation.navigate('AddUser')}>
              <Ionicons name="add" size={50} color={'#fff'} />
            </TouchableOpacity>
          ),
        })}
        name="Home"
        component={Dashboard}
      />
      <Tab.Screen
        options={{
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTitleStyle: {
            color: '#fff',
            fontSize: 25,
          },
          tabBarLabelStyle: {
            fontSize: 17,
            fontWeight: 'bold',
          },
        }}
        name="Settings"
        component={Setting}
      />
    </Tab.Navigator>
  );
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#000',
          },
        }}
        name="Dashboard"
        component={TabBottomScreen}
      />
      <HomeStack.Screen
        options={{
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTitleStyle: {
            color: '#fff',
          },
          headerTintColor: '#fff',
        }}
        name="Details"
        component={Details}
      />
      <HomeStack.Screen
        options={{
          headerShown: false,
        }}
        name="AddUser"
        component={AddUser}
      />
    </HomeStack.Navigator>
  );
}

export default function App() {
  const dispatch = useDispatch();
  const login = useSelector(state => state.EmpReducer.isLogin);
  React.useEffect(() => {
    fetchLogin();
  }, []);
  const fetchLogin = async () => {
    const data = await AsyncStorage.getItem('isLogin');
    console.log(data);
    dispatch(isLogin(JSON.parse(data)));
  };
  return (
    <NavigationContainer>
      {!login ? <AuthStackScreen /> : <HomeStackScreen />}
    </NavigationContainer>
  );
}

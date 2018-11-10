import React from 'react';
import { createStackNavigator, createMaterialTopTabNavigator, createBottomTabNavigator, createSwitchNavigator, SwitchNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Octicons';
import Profile from '../containers/Profile';
import Feed from '../containers/Feed';
import FindUsers from '../containers/FindUsers';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import FindTodos from '../containers/FindTodos';
import Notifications from '../containers/Notifications';
import MyFriends from '../containers/MyFriends';
import AddTodoButton from '../components/profile/sub_components/AddTodoButton';
import Logo from '../components/_shared/Logo';
import MenuIcon from '../components/_shared/MenuIcon';
import Settings from '../containers/Settings';
import UserProfile from '../containers/UserProfile';
import Welcome from '../containers/Welcome';
import TC from '../containers/TC';
import Auth from '../containers/Auth';
import Legal from '../containers/Legal';
import PrivacyPolicy from '../containers/PrivacyPolicy';
import Comments from '../containers/Comments';
import Colors from '../shared/colors';


const authNav = createBottomTabNavigator({
  Auth: { screen: Auth },
  Login: { screen: Login },
  Signup: { screen: Signup },
  Legal: { screen: Legal },
  TC: { screen: TC },
  PrivacyPolicy: { screen: PrivacyPolicy },
}, {
  initialRouteName: 'Login',
  tabBarOptions: {
    style: {
      display: 'none'
    }
  }
});

export const RootNav3 = createBottomTabNavigator({
  Welcome: { screen: Welcome },

  Comments: { screen: createStackNavigator({
    comments: { screen: Comments, navigationOptions: ({ navigation }) => ({
      headerLeft: <Icon name="chevron-left" size={38} color="#ffffff" onPress={() => navigation.goBack(null)} />,
      headerRight: <MenuIcon/>,
      headerTitle: 'Comments',
      headerTitleStyle: {
        color: '#ffffff',
      },
      headerStyle: {
        elevation: 0,
        backgroundColor: Colors.main,
        }
      }) 
    }
  }) 
},
  
  Settings: { screen: createStackNavigator({
    myProfile: { screen: Settings, navigationOptions: ({ navigation }) => ({
      headerLeft: <Icon name="chevron-left" size={38} color="#ffffff" onPress={() => navigation.goBack(null)} />,
      headerRight: <MenuIcon/>,
      headerTitle: 'Settings',
      headerTitleStyle: {
        color: '#ffffff',
      },
      headerStyle: {
        elevation: 0,
        backgroundColor: Colors.main,
        }
      }) 
    }
  }) 
},

  UserProfile: { screen: createStackNavigator({
    userProfile: { screen: UserProfile, navigationOptions: ({ navigation }) => ({
      headerLeft: <Icon name="chevron-left" size={38} color="#ffffff" onPress={() => navigation.goBack(null)} />,
      headerRight: <MenuIcon/>,
      headerStyle: {
        elevation: 0,
        backgroundColor: Colors.main,
        }
      }) 
    }
  }) 
},

main: {

  screen: createBottomTabNavigator({
    Activity: {
      screen: createStackNavigator({
        Activity: { screen: Feed, navigationOptions: () => ({
          headerLeft: <Logo />,
          headerRight: <MenuIcon/>,
          headerStyle: {
            elevation: 0,
            backgroundColor: Colors.main,
            }
          }) 
        }
      }),
      navigationOptions: {
        title: 'Feed',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="activity" size={21}  color={tintColor}/>
        )
      } 
    },


    Notifications : {
      screen: createStackNavigator({
        Notification: { screen: Notifications, navigationOptions: () => ({
          headerLeft: <Logo />,
          headerRight: <MenuIcon/>,
          headerStyle: {
            elevation: 0,
            backgroundColor: Colors.main,
            }
          })
        }, 
      }),
      navigationOptions: {
        title: 'Notifications',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="bell" size={21} color={tintColor}/>
        )
      } 
    },


    Todos: {
      screen: createStackNavigator({
        Todos: { screen: Profile, navigationOptions: () => ({
            headerLeft: <Logo />,
            headerRight: <AddTodoButton/>,
            headerStyle: {
              elevation: 0,
              backgroundColor: Colors.main,
            }
          }) 
        }
      }),
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="edit" size={21} color={tintColor}/>
        )
      }
    },


    Users: {
      screen: createMaterialTopTabNavigator({
        FindUsers: { screen: FindUsers, navigationOptions: { title: 'Find users' } },
        MyFriends: { screen: MyFriends, navigationOptions: { title: 'Following' } }
      }, {
        tabBarOptions: {
          indicatorStyle: {
            backgroundColor: Colors.yellow,
          },
          style: {
            fontSize: 18,
            elevation: 0,
            backgroundColor: Colors.main,
            height: 75,
            justifyContent: 'flex-end'
          }
        }
      }),
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="users" size={21} color={tintColor}/>
        )
      }
    },

    FindTodos : {
      screen: createStackNavigator({
        Notifications: { screen: FindTodos, navigationOptions: () => ({
          headerLeft: <Logo />,
          headerRight: <MenuIcon/>,
          headerStyle: {
            backgroundColor: Colors.main,
            elevation: 0,
            }
          })
        }, 
      }),
      navigationOptions: {
        title: 'Discover',
        activeTintColor: Colors.purple,
        tabBarIcon: ({ tintColor }) => (
          <Icon2 name="search" size={19} color={tintColor}/>
        )
      }
    },
  }, {
    initialRouteName: 'Activity',
    navigationOptions: {
      tabBarOptions: {
        activeTintColor: Colors.main,
        tabStyle: {
          paddingVertical: 4,
        }
      }
    }
  })
} 

}, {
  initialRouteName: 'main',
  tabBarOptions: {
    style: {
      display: 'none'
    }
  }
});

export const rootNavigator = (signedIn) => {
  let faker = false;
  let initialRoute;
  if(signedIn) {
    initialRoute = 'SignedIn'
  }
  if(!signedIn) {
    initialRoute = 'Login'
  }
  return createSwitchNavigator({
    SignedIn: { screen: RootNav3 },
    NotSignedIn: { screen: Auth },
    Login: { screen: authNav }
  }, {
    initialRouteName: faker ? initialRoute : 'NotSignedIn'
  });
};

import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator, createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather'
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
import Colors from '../shared/colors';

export const RootNav =  createBottomTabNavigator({
  Login: { screen: Login },
  Signup: { screen: Signup },
  Welcome: { screen: Welcome },

  Settings: { screen: createStackNavigator({
      myProfile: { screen: Settings, navigationOptions: () => ({
        headerLeft: <Logo />,
        headerRight: <MenuIcon/>,
        headerStyle: {
          backgroundColor: Colors.main,
          // shadowColor: '#000000',
          // borderBottomColor: '#f5f5f5',
          // shadowOffset: {
          //   width: 0,
          //   height: 1
          // },
          // shadowRadius: 2,
          // shadowOpacity: 0.2
          }
        }) 
      }
    }) 
  },

  UserProfile: { screen: createStackNavigator({
    userProfile: { screen: UserProfile, navigationOptions: () => ({
      headerLeft: <Logo />,
      headerRight: <MenuIcon/>,
      headerStyle: {
        backgroundColor: Colors.main,
        // shadowColor: '#000000',
        // borderBottomColor: '#f5f5f5',
        // shadowOffset: {
        //   width: 0,
        //   height: 1
        // },
        // shadowRadius: 2,
        // shadowOpacity: 0.2
        }
      }) 
    }
  }) 
},

  main: {

    screen: createMaterialBottomTabNavigator({
      Activity: {
        screen: createStackNavigator({
          Activity: { screen: Feed, navigationOptions: () => ({
            headerLeft: <Logo />,
            headerRight: <MenuIcon/>,
            headerStyle: {
              backgroundColor: Colors.main,
              // shadowColor: '#000000',
              // borderBottomColor: Colors.third,
              // borderBottomWidth: 2,
              // shadowOffset: {
              //   width: 0,
              //   height: 1
              // },
              // shadowRadius: 2,
              // shadowOpacity: 0.2
              }
            }) 
          }
        }),
        navigationOptions: {
          title: 'Activity',
          tabBarIcon: ({ tintColor }) => (
            <Icon name="activity" size={25} style={{ paddingBottom: 20 }} color={tintColor}/>
          )
        } 
      },


      Notifications : {
        screen: createStackNavigator({
          Notification: { screen: Notifications, navigationOptions: () => ({
            headerLeft: <Logo />,
            headerRight: <MenuIcon/>,
            headerStyle: {
              backgroundColor: Colors.main,
              // shadowColor: '#000000',
              // borderBottomColor: '#f5f5f5',
              // shadowOffset: {
              //   width: 0,
              //   height: 1
              // },
              // shadowRadius: 2,
              // shadowOpacity: 0.2
              }
            })
          }, 
        }),
        navigationOptions: {
          title: 'Notifications',
          tabBarIcon: ({ tintColor }) => (
            <Icon name="bell" size={25} style={{ paddingBottom: 20 }} color={tintColor}/>
          )
        } 
      },


      Todos: {
        screen: createStackNavigator({
          Todos: { screen: Profile, navigationOptions: () => ({
              headerLeft: <Logo />,
              headerRight: <AddTodoButton/>,
              headerStyle: {
                backgroundColor: Colors.main,
                // shadowColor: '#000000',
                // borderBottomColor: '#f5f5f5',
                // shadowOffset: {
                //   width: 0,
                //   height: 1
                // },
                // shadowRadius: 2,
                // shadowOpacity: 0.2
              }
            }) 
          }
        }),
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Icon name="edit" size={25} color={tintColor}/>
          )
        }
      },


      Users: {
        screen: createMaterialTopTabNavigator({
          FindUsers: { screen: FindUsers },
          MyFriends: { screen: MyFriends }
        }, {
          tabBarOptions: {
            style: {
              backgroundColor: Colors.main,
              height: 75,
              justifyContent: 'flex-end'
            }
          }
        }),
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Icon name="users" size={25} color={tintColor}/>
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
              shadowColor: '#000000',
              // borderBottomColor: '#ebebeb',
              // shadowOffset: {
              //   width: 0,
              //   height: 1
              // },
              // shadowRadius: 2,
              // shadowOpacity: 0.2
              }
            })
          }, 
        }),
        navigationOptions: {
          title: 'Find Todos',
          tabBarIcon: ({ tintColor }) => (
            <Icon name="trending-up" size={25} color={tintColor}/>
          )
        } 
      },


    }, {
      initialRouteName: 'Activity',
      activeTintColor: Colors.logo,
      shifting: true,
      barStyle: { 
        backgroundColor: Colors.footer,
        borderTopWidth: 1,
        borderTopColor: 'lightgray',
       },
      tabBarOptions: {
        indicatorStyle: {
          height: 0
        },
        shifting: true,
      }
    })
  } 
}, {
  tabBarOptions: {
    style: {
      display: 'none'
    }
  }
});

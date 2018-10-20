import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator, createMaterialTopTabNavigator, createBottomTabNavigator, TabNavigator } from 'react-navigation';
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
import Colors from '../shared/colors';

export const RootNav =  createBottomTabNavigator({
  Login: { screen: Login },
  Signup: { screen: Signup },
  Welcome: { screen: Welcome },
  TC: { screen: TC },

  Settings: { screen: createStackNavigator({
      myProfile: { screen: Settings, navigationOptions: () => ({
        headerLeft: <Logo />,
        headerRight: <MenuIcon/>,
        headerStyle: {
          backgroundColor: Colors.main,
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




export const RootNav3 =  createBottomTabNavigator({
  Login: { screen: Login },
  Signup: { screen: Signup },
  Welcome: { screen: Welcome },
  TC: { screen: TC },

  Settings: { screen: createStackNavigator({
    myProfile: { screen: Settings, navigationOptions: () => ({
      headerLeft: <Logo />,
      headerRight: <MenuIcon/>,
      headerStyle: {
        elevation: 0,
        backgroundColor: Colors.main,
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
        FindUsers: { screen: FindUsers },
        MyFriends: { screen: MyFriends }
      }, {
        tabBarOptions: {
          style: {
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
    navigationOptions: {
      swipeEnabled: true,
      tabBarOptions: {
        activeTintColor: Colors.main,
      }
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
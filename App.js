import React from 'react';
import Expo, { Notifications } from 'expo';
import { SafeAreaView, StatusBar, View, Alert, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { RootNav3, rootNavigator } from './src/navigation/bottomNav';
import rootReducer from './src/store/reducers';
import { apiTest } from './src/lib/api_calls';
import { tok } from './src/services/getToken';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store = createStoreWithMiddleware(rootReducer)
global.token = tok;

class App extends React.Component {
  state = {
    signedIn: false,
  }

  async componentDidMount() {
    Notifications.addListener(this.listen);
    const token = await AsyncStorage.getItem('token');
    if(token) {
      try {
        await apiTest();
        this.setState({ signedIn: true });
      }
      catch(e) {
      }     
    }
  }

  listen = ({ origin, data }) => {
    console.log(origin, data);
  };

  render() {
    const Layout = rootNavigator(this.state.signedIn);
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <StatusBar
          barStyle="light-content"
          />
          <Layout />
        </View>
      </Provider>
    );
  }
}

export default App;

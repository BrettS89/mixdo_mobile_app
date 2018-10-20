import React from 'react';
import Expo, { Notifications } from 'expo';
import { SafeAreaView, StatusBar, View, Alert } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { RootNav3 } from './src/navigation/bottomNav';
import rootReducer from './src/store/reducers';
import Colors from './src/shared/colors';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

class App extends React.Component {
  componentDidMount() {
    Notifications.addListener(this.listen);
  }

  listen = ({ origin, data }) => {
    console.log(origin, data);
  }

  render() {
    return (
      <Provider store={createStoreWithMiddleware(rootReducer)}>
        <View style={{ flex: 1 }}>
          <StatusBar
          barStyle="light-content"
          />
          <RootNav3 />
        </View>
      </Provider>
    );
  }
}

export default App;

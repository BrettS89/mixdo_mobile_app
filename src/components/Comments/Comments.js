import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

class Comments extends React.Component {
  state = {
    comments: [],
  };

  componentDidMount() {
    
  }

  render() {
    return (
      <View>
        <Text>Comments</Text>
      </View>
    );
  }
}

export default Comments;

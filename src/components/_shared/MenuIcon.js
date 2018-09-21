import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { withNavigation } from 'react-navigation';
import Colors from '../../shared/colors';

class MenuIcon extends React.Component {
  render() {
    return (
    <View style={{ marginRight: 15 }}>
      <TouchableOpacity onPress={() => this.props.navigation.navigate({ routeName: 'myProfile' })}>
        <Icon name="dots-three-vertical" size={24} color={Colors.white} />
      </TouchableOpacity>
    </View>
    );
  }
}

export default withNavigation(MenuIcon);

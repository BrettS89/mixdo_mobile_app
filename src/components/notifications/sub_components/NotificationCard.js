import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../styles';

class NotificationCard extends React.Component {
  state = {
    photo: this.props.notification.from.photo
  };

  renderProfileImage = () => {
    if(this.state.photo) {
      return <Image style={styles.profileImage} resizeMode="cover" source={{ uri: this.props.notification.from.photo }}/>
    }
    return <Image style={styles.profileImage} source={require('../../../../assets/blank-profile.png')} />
  };

  render() {
    return (
      <View style={styles.userCardContainer}>
        <View style={styles.leftContent}>
          {this.renderProfileImage()}
          <View style={styles.rightContent}>
            <Text style={styles.typeText}>{this.props.notification.message.split(':')[0]}</Text>
            <Text style={styles.userText}>{this.props.notification.message.split('"')[1]}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default NotificationCard;

import React from 'react';
import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { styles } from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { apiFollowUser } from '../../../lib/api_calls';
import Colors from '../../../shared/colors';

class FindUserCard extends React.Component {
  state = {
    following: false
  };

  renderProfileImage = () => {
    if(this.props.user.photo) {
      return <Image style={styles.profileImage} resizeMode="cover" source={{ uri: this.props.user.photo }}/>
    }
    return <Image style={styles.profileImage}  source={require('../../../../assets/blank-profile.png')} />
  };

  followUser = async () => {
    try {
      const followed = await apiFollowUser({ id: this.props.user._id });
      if(followed.success === true || followed.status === 'alreadyFollowing') {
        await this.setState({ following: true });
        this.props.getFollowers();
      }
    }
    catch(e) {
      console.log(e);
    }
  }

  viewProfile = () => {
    this.props.navigateToProfile(this.props.user._id);
  }

  renderIcon = () => {
    if(this.state.following) {
      return (
        <Text style={styles.followingText}>Following</Text>
      );
    }
    return (
      <TouchableOpacity onPress={() => this.followUser()}>
        <Icon name="md-person-add" size={24} color={Colors.secondary} />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.userCardContainer}>
        <View style={styles.leftContent}>
          {this.renderProfileImage()}
          <TouchableWithoutFeedback onPress={() => this.viewProfile()}>
            <View>
              <Text style={styles.userText} >{this.props.user.fullName}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.rightContent}>
          {this.renderIcon()}
        </View>
      </View>
    );
  }
}

export default FindUserCard;

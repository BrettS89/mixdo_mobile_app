import React from 'react';
import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { styles } from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Unfollow from 'react-native-vector-icons/MaterialCommunityIcons';
import { apiFollowUser } from '../../../lib/api_calls';
import { apiUnFollowUser } from '../../../lib/api_calls';
import { findUsers } from '../../../store/actions/findUsers';
import Colors from '../../../shared/colors';

class FindUserCard extends React.Component {
  state = {
    photo: this.props.user.photo,
    following: this.props.user.following,
  };

  componentDidMount() {
    this.setState({ following: this.props.user.following });
  }

  followUser = async () => {
    try {
      const followed = await apiFollowUser({ id: this.props.user._id });
      if(followed.success === true) {
        await this.setState({ following: true });
        await findUsers();
      }
    }
    catch(e) {
      console.log(e)
    }
  }

  unfollowUser = async () => {
    try {
      const unFollowed = await apiUnFollowUser({ id: this.props.user._id });
      if(unFollowed.success === true) {
        await this.setState({ following: false });
        await findUsers();
      }
    }
    catch(e) {
      console.log(e);
    }
  };

  viewProfile = () => {
    this.props.navigateToProfile(this.props.user._id);
  }

  renderProfileImage = () => {
    if(this.state.photo) {
      return <Image style={styles.profileImage} resizeMode="cover" source={{ uri: this.props.user.photo }}/>
    }
    return <Image style={styles.profileImage} source={require('../../../../assets/blank-profile.png')} />
  };

  renderIcon = () => {
    if(this.state.following === true) {
      
      return (
        <TouchableOpacity onPress={() => this.unfollowUser()}>
          <Unfollow name="account-remove" size={26} color="#FE4C4B" />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={() => this.followUser()}>
        <Icon name="md-person-add" size={24} color={Colors.secondary}/>
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

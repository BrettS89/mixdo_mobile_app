import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Keyboard } from 'react-native';
import { styles } from './styles';
import { Input3 } from '../_shared';
import FindUserCard from './sub_components/FindUsersCard';

class FindUsers extends React.Component {
  state = {
    users: [],
    noUsers: '',
    name: ''
  };
  
  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    await this.props.findUsers();

    if(this.props.users.payload.users === 'no users') {
      this.setState({ noUsers: 'No users to display' });
      return;
    }

    const { following, users } = this.props.users.payload;
    if(following.following !== undefined) {
      const followerIds = following.following.map(follower => follower._id);
      const unfollowedUsers = users.filter(user => {
        return followerIds.indexOf(user._id) === -1;
      });
      this.setState({ users: unfollowedUsers });
    } else {
      this.setState({ users });
    }
  };

  onSearchType = async (name) => {
    await this.setState({ name });
    if(!this.state.name) {
      this.getUsers();
    }
  };
 
  onSearchSubmit = async () => {
    Keyboard.dismiss();
    await this.props.searchUser(this.state.name);

    const { following } = this.props.users.payload;
    if(following.following !== undefined) {
      const followerIds = following.following.map(follower => follower._id);
      const unfollowedUsers = this.props.searchedUsers.payload.filter(user => {
        return followerIds.indexOf(user._id) === -1;
      });
      this.setState({ users: unfollowedUsers });
    }
  };

  showNoUsersMessage = () => {
    return this.state.noUsers;
  };

  getFollowers = () => {
    this.props.getFollowers('Followers');
  }

  handleEnd = async () => {
    if(this.state.users.length > 0) {
    const lastUser = this.state.users.length - 1;
    const lastUserDate = this.state.users[lastUser].date;
    await this.props.findUsersInfinite({ date: lastUserDate });
    let infinityPayload = [];
    if(this.props.infiniteUsers.payload.length > 0 ) {
      infinityPayload = this.props.infiniteUsers.payload;
      await this.setState({ users: [...this.state.users, ...infinityPayload ] });
    }
  }
};

  navigateToProfile = async (id) => {
    await this.props.getUserProfile(id);
    this.props.navigation.navigate('userProfile', {
      _id: id
    });
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.searchContainer}>
          <Input3 
            placeholder="Search for users"
            onChangeText={name => this.onSearchType(name)}
            onSearch={this.onSearchSubmit}
          />
        </View>
        <FlatList 
          data={this.state.users}
          onEndReached={this.handleEnd}
          onEndReachedThreshold={5}
          renderItem={(user) => (
            <FindUserCard user={user.item} getFollowers={this.getFollowers} navigateToProfile={this.navigateToProfile}/>
          )}
          keyExtractor={user => user._id}
          showsVerticalScrollIndicator={false}
        />
        <Text>{this.showNoUsersMessage()}</Text>
      </View> 
    );
  }
}

export default FindUsers;

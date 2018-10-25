import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import FollowingCard from './sub_components/FindUsersCard';
import { styles } from './styles';

class MyFriends extends React.Component {
  state = {
    users: [],
    picked: 'Followers',
    test: ''
  };

  async componentWillMount() {
    await this.props.getFollowers('Followers');
    await this.setState({ picked: 'Followers', users: this.props.state.followers.payload.followers1 });
  }

  async componentWillReceiveProps(nextProps) {
    await this.setState({ test: 'in!!!', users: [] });
    await this.setState({ users: nextProps.state.followers.payload.followers1 });
  }  

  pressFollowers = async () => {
    await this.props.getFollowers('Followers');
    this.setState({ picked: 'Followers' });
  };

  pressFollowing = async () => {
    await this.props.getFollowers('Following');
    this.setState({ picked: 'Following' });
  }

  navigateToProfile = async (id) => {
    await this.props.getUserProfile(id);
    this.props.navigation.navigate('userProfile', {
      _id: id
    });
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>

        <View style={styles.optionsContainer}>
          <View>
            <Text style={styles.optionText}>{this.state.picked === 'Followers' ? 'Followers' : 'Following'}</Text>
          </View>
          <View style={styles.rightContent1}>
            <TouchableOpacity onPress={() => this.pressFollowers()}>
              <Text style={styles.rightText2}>Followers</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.pressFollowing()}>
              <Text style={styles.rightText}>Following</Text>
            </TouchableOpacity>
          </View>  
        </View>

        <FlatList
          data={this.state.users}
          renderItem={this.renderItem}

          renderItem={(user) => (
            <FollowingCard user={user.item} navigateToProfile={this.navigateToProfile}/>
          )}


          keyExtractor={user => user._id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

export default MyFriends;

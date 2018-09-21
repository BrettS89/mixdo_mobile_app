import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Todo } from '../_shared';
import Like from 'react-native-vector-icons/SimpleLineIcons';
import Add from 'react-native-vector-icons/MaterialCommunityIcons';
import Comment from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';
import Colors from '../../shared/colors';
import { apiFollowUser } from '../../lib/api_calls';

class Post extends React.Component {
  state = {
    liked: false,
    likes: this.props.todo.item.likes ? this.props.todo.item.likes.length : 0,
    adds: this.props.todo.item.added ? this.props.todo.item.added.length : 0,
    didAdd: false,
    followed: false,
  };

  renderProfileImage = () => {
    if(this.props.todo.item.user.photo) {
      return <Image style={styles.profileImage} resizeMode="cover" source={{ uri: this.props.todo.item.user.photo }}/>
    }
    return <Image style={styles.profileImage} source={require('../../../assets/blank-profile.png')} />
  };

  renderFollow = () => {
    if(!this.props.todo.item.following && this.props.discover && this.state.followed === false) {
      return (
        <TouchableOpacity style={styles.followButton} onPress={() => this.followUser()}>
          <Text style={styles.followText}>Follow +</Text>
        </TouchableOpacity>
      );
    }
    return <View></View>;
  };

  renderFollowing = () => {
    if(this.state.followed) {
      return (
        <View style={styles.followButton}>
          <Text style={styles.followedText}>Following</Text>
        </View>
      );
    }
    return <View></View>;
  };

  followUser = async () => {
    try {
      const followed = await apiFollowUser({ id: this.props.todo.item.user._id });
      if(followed.success === true) {
        await this.setState({ followed: true });
        this.props.getFollowers();
      }
    }
    catch(e) {
      console.log(e)
    }
  };

  viewProfile = () => {
    this.props.navigateToProfile(this.props.todo.item.user._id);
  };

  likeTodo = async () => {
    await this.props.likeTodo(this.props.todo.item._id);
    await this.setState({ liked: true, likes: this.state.likes + 1 });
  };

  addUserTodo = async () => {
    const todo = {
      _id: this.props.todo.item._id,
      description: this.props.todo.item.description,
      metaData: this.props.todo.item.metaData
    };
    await this.props.addUserTodo(todo);
    this.setState({ didAdd: true, adds: this.state.adds + 1 });
  };

  renderStatusText = () => {
    if(this.props.todo.item.finished) {
      return <Text style={styles.headerTextFinished}>{this.props.todo.item.user.firstName} {this.props.todo.item.user.lastName} finished a Todo</Text>;
    }
    return <Text style={styles.headerText}>{this.props.todo.item.user.firstName} {this.props.todo.item.user.lastName} added a Todo</Text>
  };

  renderLike = () => {
    if(this.props.todo.item.liked || this.state.liked) {
      return (
        <View style={styles.action} >
          <Like name="like" color={Colors.third} size={20} />
          <Text style={styles.actionsTextLiked}>Liked</Text>
        </View>
      );
    }
    return (
      <TouchableOpacity style={styles.action} onPress={() => this.likeTodo()}>
        <Like name="like" color="#ababab" size={20} />
        <Text style={styles.actionsText}>Like</Text>
      </TouchableOpacity>
    );
  };

  renderAdded = () => {
    if(this.props.todo.item.didAdd || this.state.didAdd) {
      return (
        <View style={styles.action} onPress={() => this.addUserTodo()}>
          <Add name="playlist-plus" color={Colors.third} size={20} />
          <Text style={styles.actionsTextLiked}>Added</Text>
        </View>
      );
    }
    return (
      <TouchableOpacity style={styles.action} onPress={() => this.addUserTodo()}>
        <Add name="playlist-plus" color="#ababab" size={20} />
        <Text style={styles.actionsText}>Add Todo</Text>
      </TouchableOpacity>
    );
  };

  renderLikes = () => {
    if(this.state.likes > 0) {
      return (
        <View style={styles.likesCountContainer}>
          <Text style={styles.likesCount}>{this.state.likes}</Text>
          <View style={styles.likesIcon}>
            <Like name="like" color="#ffffff" size={10} />
          </View>
        </View>
      );
    }
    return <View></View>;
  };

  renderAdds = () => {
    if(this.state.adds > 0) {
      return (
        <View style={styles.likesCountContainer}>
          <Text style={styles.addsCount}>{this.state.adds}</Text>
          <View style={styles.addsIcon}>
            <View style={{ marginLeft: 2, marginTop: 1 }}>
              <Add name="playlist-plus" color="#ffffff" size={14} />
            </View>
          </View>
        </View>
      )
    }
    return <View></View>;
  };

  renderPost = () => {
    if(this.props.todo.item.image) {
      return (
        <View style={styles.mainContainer2}>
        <View style={{ alignItems: 'flex-end' }}>
          {this.renderFollow()}
          {this.renderFollowing()}
        </View>
        <View>
          <View style={{ paddingLeft: 10, paddingRight: 10 }}>
            <View style={styles.topContent}>
              <View style={styles.imageContainer}>
                {this.renderProfileImage()}
              </View>
              <View> 
                <TouchableWithoutFeedback onPress={() => this.viewProfile()}>
                  <View>
                    {this.renderStatusText()}
                  </View>
                </TouchableWithoutFeedback> 
                  <Text style={styles.dateText}>{this.props.todo.item.createdDate}</Text>
              </View>  
            </View>
          </View>

          <View style={styles.todoContainer2}>
            <Todo todo={this.props.todo} finished={[]} flat />
          </View>
          <View>
            <Image source={{ uri: this.props.todo.item.image }} style={{ aspectRatio: 1/1 }} />
          </View>

          <View style={styles.interactionsContainer}>
            {this.renderLikes()}
            {this.renderAdds()}
          </View>

        </View>

        
        
        <View style={styles.actionsContainer}>
          <View style={styles.actionsSubContainer}>

            {this.renderLike()}

            {this.renderAdded()}

            <View style={styles.action}>
              <Comment name="comment-o" color="#ababab" size={20} style={{ marginBottom: 1 }} />
              <Text style={styles.actionsText}>Comment</Text>
            </View>

          </View>
        </View>
      </View>
      );
    }
    return (
      <View style={this.props.todo.item.finished ? styles.mainContainerFinished : styles.mainContainer}>
        <View style={{ alignItems: 'flex-end' }}>
          {this.renderFollow()}
          {this.renderFollowing()}
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.topContent}>
            <View style={styles.imageContainer}>
              {this.renderProfileImage()}
            </View>
            <View> 
              <TouchableWithoutFeedback onPress={() => this.viewProfile()}>
                <View>
                  {this.renderStatusText()}
                </View>
              </TouchableWithoutFeedback> 
                <Text style={styles.dateText}>{this.props.todo.item.createdDate}</Text>
            </View>  
          </View>

          <View style={styles.todoContainer}>
            <Todo todo={this.props.todo} finished={[]} />
          </View>

          <View style={styles.interactionsContainer}>
            {this.renderLikes()}
            {this.renderAdds()}
          </View>

      </View>
        
        <View style={styles.actionsContainer}>
          <View style={styles.actionsSubContainer}>

            {this.renderLike()}

            {this.renderAdded()}

            <View style={styles.action}>
              <Comment name="comment-o" color="#ababab" size={20} style={{ marginBottom: 1 }} />
              <Text style={styles.actionsText}>Comment</Text>
            </View>

          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View>
        {this.renderPost()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    paddingBottom: 7,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#eaeaea',
    marginBottom: 10,
  },
  mainContainer2: {
    paddingTop: 10,
    paddingBottom: 7,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#eaeaea',
    marginBottom: 10,
  },
  mainContainerFinished: {
    padding: 10,
    paddingBottom: 7,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#eaeaea',
    marginBottom: 10,
  },
  contentContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    marginBottom: 7
  },
  topContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileImage: {
    height: 60,
    borderRadius: 30,
    width: 60,
  },
  imageContainer: {
    marginRight: 10
  },
  headerText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.logo,
  },
  headerTextFinished: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.logo,
    // color: Colors.secondary,
  },
  dateText: {
    fontSize: 12,
    color: '#ababab'
  },
  todoContainer: {
    marginTop: 5,
    marginBottom: 8
  },
  todoContainer2: {
    marginTop: 5,
  },
  actionsContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionsSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%'
  },
  action: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  action2: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 7
  },
  actionsText: {
    fontSize: 12,
    color: '#ababab',
    paddingTop: 3
  },
  actionsTextLiked: {
    fontSize: 12,
    color: Colors.third,
    paddingTop: 3
  },
  interactionsContainer: {
    marginBottom: 10, 
    paddingLeft: 15,
    flexDirection: 'row' 
  },
  likesCountContainer: {
    flexDirection: 'row',
    marginRight: 5
  },
  likesIcon: {
    height: 20,
    width: 20,
    borderRadius: 15,
    backgroundColor: Colors.third,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addsIcon: {
    height: 20,
    width: 20,
    borderRadius: 15,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  likesCount: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.third,
    marginRight: 2
  },
  addsCount: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.secondary,
    marginRight: 2
  },
  followText: {
    color: '#2196F3',
  },
  followButton: {
    marginBottom: 0,
    paddingBottom: 0,
    marginRight: 20,
  },
  followedText: {
    color: Colors.secondary,
  }
});

export default withNavigation(Post);

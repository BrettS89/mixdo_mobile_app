import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Todo } from '../_shared';
import Like from 'react-native-vector-icons/Feather';
import Add from 'react-native-vector-icons/MaterialCommunityIcons';
import Comment from 'react-native-vector-icons/FontAwesome';
import Options from 'react-native-vector-icons/Entypo';
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
    date: '',
  };

  async componentWillMount() {
    const preDate = this.props.todo.item.createdDate.split(' ');
    const todoDate = [preDate[0], preDate[1], preDate[2]].join(' ');
    await this.setState({ date: todoDate });
  }

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
      if(followed.success === true || followed.status === 'alreadyFollowing') {
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
      return <Text style={styles.headerTextFinished}>{this.props.todo.item.user.fullName} finished a Todo</Text>;
    }
    return <Text style={styles.headerText}>{this.props.todo.item.user.fullName} added a Todo</Text>
  };

  renderLike = () => {
    if(this.props.todo.item.liked || this.state.liked) {
      return (
        <View style={styles.action} >
          <Like name="heart" color={Colors.third} size={21} />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {this.renderLikes()}
            <Text style={styles.actionsTextLiked}>Liked</Text>
          </View>  
        </View>
      );
    }
    return (
      <TouchableOpacity style={styles.action} onPress={() => this.likeTodo()}>
        <Like name="heart" color="#ababab" size={21} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {this.renderLikes()}
          <Text style={styles.actionsText}>Like</Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderAdded = () => {
    if(this.props.todo.item.didAdd || this.state.didAdd) {
      return (
        <View style={styles.action} onPress={() => this.addUserTodo()}>
          <Add name="playlist-plus" color={Colors.third} size={20} />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {this.renderAdds()}
            <Text style={styles.actionsTextLiked}>Added</Text>
          </View>
        </View>
      );
    }
    return (
      <TouchableOpacity style={styles.action} onPress={() => this.addUserTodo()}>
        <Add name="playlist-plus" color="#ababab" size={20} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {this.renderAdds()}
          <Text style={styles.actionsText}>Add</Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderLikes = () => {
    if(this.state.likes > 0) {
      return (
        <View style={styles.likesCountContainer}>
          
          <View style={styles.likesIcon}>
          <Text style={styles.likesCount}>{this.state.likes}</Text>
            {/* <Like name="like" color="#ffffff" size={10} /> */}
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
          <View style={styles.addsIcon}>
            <View style={{ marginLeft: 2, marginTop: 1 }}>
            <Text style={styles.addsCount}>{this.state.adds}</Text>
              {/* <Add name="playlist-plus" color="#ffffff" size={14} /> */}
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
        <View style={ [styles.mainContainer2, { paddingTop: 10 } ] }>
          <View style={{ position: 'absolute', top: 1, flexDirection: 'row', width: '100%', paddingTop: 5, justifyContent: 'flex-end', paddingRight: 5, zIndex: 50 }}>
            {this.renderFollow()}
            {this.renderFollowing()} 
           <TouchableOpacity onPress={() => this.props.showFlag(this.props.todo.item._id)}  >
              <Options name="dots-three-vertical" size={20} color="lightgray"  />
            </TouchableOpacity>
          </View>
        <View style={{ alignItems: 'flex-end', marginRight: 0 }}>
          
          
        </View>
        <View>
          <View style={{ paddingLeft: 10, paddingRight: 10 }}>
            <View style={[styles.topContent, { bottom: 0 } ]}>
              <View style={styles.imageContainer}>
                {this.renderProfileImage()}
              </View>
              <View> 
                <TouchableWithoutFeedback onPress={() => this.viewProfile()}>
                  <View>
                    {this.renderStatusText()}
                  </View>
                </TouchableWithoutFeedback> 
                  <Text style={styles.dateText}>{this.state.date}</Text>
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
          </View>

        </View>

        
        
        <View style={styles.actionsContainer}>
          <View style={styles.actionsSubContainer}>

            {this.renderLike()}

            {this.renderAdded()}

            {/* <View style={styles.action}>
              <Comment name="comment-o" color="#ababab" size={20} style={{ marginBottom: 1 }} />
              <Text style={styles.actionsText}>Comment</Text>
            </View> */}

          </View>
        </View>
      </View>
      );
    }
    return (
      <View>
        <View style={{ position: 'absolute', top: 1, flexDirection: 'row', width: '100%', paddingTop: 5, paddingRight: 5, justifyContent: 'flex-end', zIndex: 50 }}>
          {this.renderFollow()}
          {this.renderFollowing()}
          <TouchableOpacity onPress={() => this.props.showFlag(this.props.todo.item._id)}  >
            <Options name="dots-three-vertical" size={20} color="lightgray"  />
          </TouchableOpacity>
        </View>
      <View style={[this.props.todo.item.finished ? styles.mainContainerFinished : styles.mainContainer, { paddingTop: 10, }]}>
        <View style={{ alignItems: 'flex-end', paddingLeft: 10 }}>
          
        </View>
        <View >
          <View style={[styles.topContent, { bottom: 0 } ]}>
            <View style={styles.imageContainer}>
              {this.renderProfileImage()}
            </View>
            <View> 
              <TouchableWithoutFeedback onPress={() => this.viewProfile()}>
                <View>
                  {this.renderStatusText()}
                </View>
              </TouchableWithoutFeedback> 
                <Text style={styles.dateText}>{this.state.date}</Text>
            </View>  
          </View>

          <View style={styles.todoContainer2}>
            <Todo todo={this.props.todo} finished={[]} />
          </View>

          <View style={styles.interactionsContainer}>
            
          </View>

      </View>
        
        <View style={styles.actionsContainer}>
          <View style={styles.actionsSubContainer}>

            {this.renderLike()}

            {this.renderAdded()}

            {/* <View style={styles.action}>
              <Comment name="comment-o" color="#ababab" size={20} style={{ marginBottom: 1 }} />
              <Text style={styles.actionsText}>Comment</Text>
            </View> */}

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
    paddingTop: 10,
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
    width: '55%'
  },
  action: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60

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
    top: 1,
    height: 13,
    width: 13,
    borderRadius: 15,
    backgroundColor: Colors.third,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addsIcon: {
    top: 1,
    height: 13,
    width: 13,
    borderRadius: 15,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  likesCount: {
    fontSize: 9,
    fontWeight: '500',
    color: Colors.white,
  },
  addsCount: {
    fontSize: 9,
    fontWeight: '500',
    color: Colors.white,
    marginRight: 2,
    marginBottom: 1
  },
  followText: {
    color: Colors.main,
  },
  followButton: {
    marginBottom: 0,
    paddingBottom: 0,
    marginRight: 15,
  },
  followedText: {
    color: Colors.secondary,
  }
});

export default withNavigation(Post);

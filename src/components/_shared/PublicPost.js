import React from 'react';
import { View, Text, StyleSheet, Image, Modal } from 'react-native';
import { Todo } from '../_shared';
import Like from 'react-native-vector-icons/Feather';
import Add from 'react-native-vector-icons/MaterialCommunityIcons';
import Comment from 'react-native-vector-icons/FontAwesome';
import Options from 'react-native-vector-icons/Entypo';
import Colors from '../../shared/colors';

class PublicPost extends React.Component {
  state = {
    modal: true,
    likes: this.props.todo.item.likes ? this.props.todo.item.likes.length : 0,
    adds: this.props.todo.item.added ? this.props.todo.item.added.length : 0,
    date: '',
  };

  async componentWillMount() {
    const preDate = this.props.todo.item.createdDate.split(' ');
    const todoDate = [preDate[0], preDate[1], preDate[2]].join(' ');
    await this.setState({ date: todoDate });
  }

  renderProfileImage = () => {
    if(!this.props.todo.item.user) {
      return;
    }
    if(this.props.todo.item.user.photo) {
      return <Image style={styles.profileImage} resizeMode="cover" source={{ uri: this.props.todo.item.user.photo }}/>
    }
    return <Image style={styles.profileImage} source={require('../../../assets/blank-profile.png')} />
  };

  renderStatusText = () => {
    if(this.props.todo.item.finished) {
      return <Text style={styles.headerTextFinished}>{this.props.todo.item.user.fullName} finished a Todo</Text>;
    }
    return <Text style={styles.headerText}>{this.props.todo.item.user.fullName} added a Todo</Text>
  };

  renderLike = () => {
    return (
      <View style={styles.action}>
        <Like name="heart" color="#ababab" size={21} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {this.renderLikes()}
          <Text style={styles.actionsText}>Like</Text>
        </View>
      </View>
    );
  };

  renderAdded = () => {
    return (
      <View style={styles.action}>
        <Add name="playlist-plus" color="#ababab" size={20} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {this.renderAdds()}
          <Text style={styles.actionsText}>Add</Text>
        </View>
      </View>
    );
  };

  renderComments = () => {
    return (
      <View style={styles.action}>
        <Comment name="comment-o" color="#ababab" size={20} style={{ marginBottom: 1 }} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {this.renderCommentCount()}
          <Text style={styles.actionsText}>Comment</Text>
        </View>
      </View>
    );
  }

  renderLikes = () => {
    if(this.state.likes > 0) {
      return (
        <View style={styles.likesCountContainer}>
          <View style={styles.likesIcon}>
          <Text style={styles.likesCount}>{this.state.likes}</Text>
          </View>
        </View>
      );
    }
    return;
  };

  renderAdds = () => {
    if(this.state.adds > 0) {
      return (
        <View style={styles.likesCountContainer}>
          <View style={styles.addsIcon}>
            <View style={{ marginLeft: 2, marginTop: 1 }}>
            <Text style={styles.addsCount}>{this.state.adds}</Text>
            </View>
          </View>
        </View>
      );
    }
    return;
  };

  renderCommentCount = () => {
    if(this.props.todo.item.commentCount > 0) {
      return (
        <View style={styles.likesCountContainer}>
          <View style={styles.addsIcon}>
            <View style={{ marginLeft: 2, marginTop: 1 }}>
            <Text style={styles.addsCount}>{this.props.todo.item.commentCount}</Text>
            </View>
          </View>
        </View>
      );
    }
    return;
  }

  renderPost = () => {
    if(this.props.todo.item.image) {
      return (
        <View style={ [styles.mainContainer2, { paddingTop: 10 } ] }>
          <View style={{ position: 'absolute', top: 1, flexDirection: 'row', width: '100%', paddingTop: 5, justifyContent: 'flex-end', paddingRight: 5, zIndex: 50 }}>
            <View>
              <Options name="dots-three-vertical" size={20} color="lightgray"  />
            </View>
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
                <View>
                  <View>
                    {this.renderStatusText()}
                  </View>
                </View> 
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

        {this.props.todo.item.commentCount > 0 && (
          <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#ededed', marginBottom: 6 }}>
            <View style={{ flexDirection: 'row', marginLeft: 10 }}>
              <Text style={{ fontSize: 12, marginBottom: 5, color: Colors.main, fontWeight: '500' }}>View comments</Text>
            </View>
          </View>
        )}
        
        <View style={styles.actionsContainer}>
          <View>

          </View>
          <View style={styles.actionsSubContainer}>
            {this.renderLike()}
            {this.renderAdded()}
            {this.renderComments()}
          </View>
        </View>
      </View>
      );
    }
    return (
      <View>
        <View style={{ position: 'absolute', top: 1, flexDirection: 'row', width: '100%', paddingTop: 5, paddingRight: 5, justifyContent: 'flex-end', zIndex: 50 }}>
          <View>
            <Options name="dots-three-vertical" size={20} color="lightgray"  />
          </View>
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
              <View>
                <View>
                  {this.renderStatusText()}
                </View>
              </View> 
                <Text style={styles.dateText}>{this.state.date}</Text>
            </View>  
          </View>

          <View style={styles.todoContainer2}>
            <Todo todo={this.props.todo} finished={[]} />
          </View>

          <View style={styles.interactionsContainer}>
            
          </View>

      </View>

      {this.props.todo.item.commentCount > 0 && (
        <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#ededed', marginBottom: 6 }}>
          <View style={{ flexDirection: 'row', marginLeft: 10 }}>
            <Text style={{ fontSize: 12, marginBottom: 5, color: Colors.main, fontWeight: '500' }}>View comments</Text>
          </View>
        </View>
      )}
        
        <View style={styles.actionsContainer}>
          <View style={styles.actionsSubContainer}>
            {this.renderLike()}
            {this.renderAdded()}
            {this.renderComments()}
          </View>
        </View>
      </View>
      </View>
    );
  };

  render() {
    return (
      <View>
        {this.renderPost()}
      </View>
    );
  }
}

export default PublicPost;

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
    width: '85%'
  },
  action: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80

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
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: Colors.third,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addsIcon: {
    top: 1,
    height: 16,
    width: 16,
    borderRadius: 8,
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
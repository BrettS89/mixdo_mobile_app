import React from 'react';
import { View, Text, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { styles } from './styles';
import { Input2 } from '../_shared';
import UserComment from './sub_components/UserComment';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../shared/colors';

class Comments extends React.Component {
  state = {
    newComment: '',
    comments: [],
  };

  componentDidMount() {

  }

  onKeyPress = async (comment) => {
    await this.setState({ newComment: comment });
  };

  addComment = () => {
    if(this.state.newComment.length > 3) {
      Keyboard.dismiss();
      this.props.addComment({ id: this.props.state.comments.todo, content: this.state.newComment, currentComments: this.props.state.comments });
      this.setState({ newComment: '' });
      
    } 
  };

  render() {
    const { comments } = this.props.state.comments; 
    return (
      <KeyboardAvoidingView style={styles.mainContainer} behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 80} enabled >
        <FlatList 
          data={comments ? comments: []}
          keyExtractor={comment => comment._id}
          renderItem={(comment) => (
            <UserComment
              comment={comment.item} />
          )}
        />
        <View style={styles.searchContainer}>
          <View style={{ width: '85%', flexDirection: 'row' }}>
            <Input2 value={this.state.newComment} placeholder="Add your comment..." style={{ borderColor: '#ffffff' }} onChangeText={comment => this.onKeyPress(comment)} />
          </View>
          <TouchableOpacity style={styles.sendContainer} onPress={() => this.addComment()}>
            <Icon name="md-send" size={40} color={Colors.main} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default Comments;

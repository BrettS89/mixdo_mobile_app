import React from 'react';
import { View, FlatList, StatusBar, Text, Modal, TouchableOpacity } from 'react-native';
import { SplashScreen } from 'expo';
import { styles } from './styles';
import Post from '../_shared/Post';
import Colors from '../../shared/colors';

class Feed extends React.Component {
  state = {
    todos: [],
    refreshing: false,
    showFlag: false,
    toFlag: '',
  };

  componentWillMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
    this.getTodos();
  }

  getTodos = async () => {
    await this.setState({ todos: [], refreshing: true });
    await this.props.getTodos();
    await this.setState({ todos: [...this.props.todos.payload], refreshing: false });
  };

  navigateToProfile = async (id) => {
    await this.props.getUserProfile(id);
    this.props.navigation.navigate('userProfile', {
      _id: id
    });
  };

  likeTodo = (todo) => {
    const body = { todo };
    this.props.likeTodo(body);
  };

  addUserTodo = (todo) => {
    this.props.addUserTodo(todo);
  };

  showFlagModal = (todo) => {
    this.setState({ showFlag: true, toFlag: todo });
  };

  flagTodo = async () => {
    await this.props.flagTodo({ id: this.state.toFlag });
    console.log(this.props.flaggedTodo);
    if(this.props.flaggedTodo.payload.status) {
      this.getTodos();
    } 
    this.setState({ showFlag: false, toFlag: '' });
  };

  handleEnd = async () => {
      if(this.state.todos.length > 0) {
      const lastTodo = this.state.todos.length - 1;
      const lastTodoDate = this.state.todos[lastTodo].date;
      await this.props.infinityTodos({ date: lastTodoDate });
      let infinityPayload = [];
      if(this.props.infinity.payload.length > 0 ) {
        infinityPayload = this.props.infinity.payload
        this.setState({ todos: [...this.state.todos, ...infinityPayload ] });
      }
    }
  };

  zeroTodos = () => {
    if(this.state.todos.length === 0 && this.state.refreshing === false) {
      return (
        <View style={styles.zeroContainer}>
          <Text style={styles.zeroText}>When you follow other users you'll see their todos here</Text>
          {/* <Text style={styles.zeroText}>When you add todos other users can view, like, or add them</Text> */}
        </View>
      );
    }
    return <View></View>;
  };

  render() {
    return (
      <View style={styles.mainContainer}>
      <StatusBar
          barStyle="default"
          backgroundColor={Colors.main}
          />
        {this.zeroTodos()}  
        <FlatList 
          data={this.state.todos}
          keyExtractor={todo => todo._id}
          onEndReached={this.handleEnd}
          onEndReachedThreshold={1}
          showsVerticalScrollIndicator={false}
          renderItem={(todo) => (
            <Post todo={todo} navigateToProfile={this.navigateToProfile} likeTodo={this.likeTodo} addUserTodo={this.addUserTodo} showFlag={this.showFlagModal} />
          )}
          refreshing={this.state.refreshing}
          onRefresh={this.getTodos}
          // extraData = {this.state}
        />

        <Modal
          transparent
          visible={this.state.showFlag === true}
          onRequestClose={() => this.setState({ showFlag: false })}
          >
          <View style={styles.modalContainer}>
            <View style={styles.modalSubContainer2}>
              <TouchableOpacity style={styles.flagContent} onPress={() => this.flagTodo()}>
                <Text style={styles.flagContentText}>Flag content</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ showFlag: false })}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>  
        </Modal> 

      </View>  
    );
  }
}

export default Feed;

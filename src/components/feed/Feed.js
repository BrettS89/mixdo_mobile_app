import React from 'react';
import { View, FlatList, StatusBar } from 'react-native';
import { Asset, SplashScreen } from 'expo';
import { styles } from './styles';
import Post from '../_shared/Post';
import Colors from '../../shared/colors';

class Feed extends React.Component {
  state = {
    todos: [],
    refreshing: false
  };

  componentWillMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500)
    
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

  render() {
    return (
      <View style={styles.mainContainer}>
      <StatusBar
          barStyle="default"
          backgroundColor={Colors.main}
          />
        <FlatList 
          data={this.state.todos}
          keyExtractor={todo => todo._id}
          onEndReached={this.handleEnd}
          onEndReachedThreshold={1}
          showsVerticalScrollIndicator={false}
          renderItem={(todo) => (
            <Post todo={todo} navigateToProfile={this.navigateToProfile} likeTodo={this.likeTodo} addUserTodo={this.addUserTodo} />
          )}
          refreshing={this.state.refreshing}
          onRefresh={this.getTodos}
          // extraData = {this.state}
        />
      </View>  
    );
  }
}

export default Feed;

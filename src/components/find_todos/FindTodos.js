import React from 'react';
import { View, Text, FlatList, Keyboard } from 'react-native';
import { styles } from './styles';
import Post from '../_shared/Post';
import { Input3 } from '../_shared';

class FindTodos extends React.Component{
  state = {
    todos: [],
    search: '',
    refreshing: false
  };

  componentWillMount() {
    this.getTodos();
  }

  getTodos = async () => {
    await this.setState({ todos: [], refreshing: true });
    await this.props.discoverTodos();
    this.setState({ todos: this.props.todos.payload, refreshing: false });
  };

  navigateToProfile = async (id) => {
    await this.props.getUserProfile(id);
    this.props.navigation.navigate('userProfile', {
      _id: id
    });
  };

  onSearchType = async (search) => {
    await this.setState({ search });
    if(!this.state.search) {
      this.getTodos();
    }
  };

  onSearchSubmit = async () => {
    Keyboard.dismiss();
    await this.props.searchTodos(this.state.search);
    this.setState({ todos: this.props.searchedTodos.payload });
  };

  likeTodo = (todo) => {
    const body = { todo };
    this.props.likeTodo(body);
  };

  addUserTodo = (todo) => {
    this.props.addUserTodo(todo);
  };

  getFollowers = (id) => {
    this.props.getFollowers('Followers');
  };

  handleEnd = async () => {
    if(this.state.todos.length > 0 && this.state.search.length === 0) {
    const lastTodo = this.state.todos.length - 1;
    const lastTodoDate = this.state.todos[lastTodo].date;
    await this.props.infinityDiscover({ date: lastTodoDate });
    let infinityPayload = [];
    if(this.props.infinityDiscovered.payload.length > 0 ) {
      infinityPayload = this.props.infinityDiscovered.payload
      await this.setState({ todos: [...this.state.todos, ...infinityPayload ] });
    }
  }
};

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.searchContainer}>
          <Input3 
            placeholder="Search todo topics"
            onChangeText={search => this.onSearchType(search)}
            onSearch={this.onSearchSubmit}
          />
        </View>    
        <FlatList 
          data={this.state.todos}
          renderItem={(todo) => (
            <Post todo={todo} navigateToProfile={this.navigateToProfile} likeTodo={this.likeTodo} addUserTodo={this.addUserTodo} discover getFollowers={this.getFollowers}/>
          )}
          onEndReached={this.handleEnd}
          onEndReachedThreshold={1}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          refreshing={this.state.refreshing}
          onRefresh={this.getTodos}
        />
      </View>  
    );
  }
}

export default FindTodos;

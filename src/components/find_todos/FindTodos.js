import React from 'react';
import { View, Text, FlatList, Keyboard, Modal, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import Post from '../_shared/Post';
import { Input3 } from '../_shared';

class FindTodos extends React.Component{
  state = {
    todos: [],
    search: '',
    refreshing: false,
    showFlag: false,
    toFlag: '',
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

  showFlagModal = (todo) => {
    this.setState({ showFlag: true, toFlag: todo });
  };

  flagTodo = async () => {
    await this.props.flagTodo({ id: this.state.toFlag });
    if(this.props.flaggedTodo.payload.status) {
      alert('Todo flagged for review');
      this.getTodos();
    } else {
      alert('an error occured');
    }
    this.setState({ showFlag: false, toFlag: '' });
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
            <Post 
              todo={todo} 
              navigateToProfile={this.navigateToProfile} 
              likeTodo={this.likeTodo} addUserTodo={this.addUserTodo} 
              discover 
              getFollowers={this.getFollowers} 
              showFlag={this.showFlagModal} 
              flagTodo={this.flagTodo}
              />
          )}
          onEndReached={this.handleEnd}
          onEndReachedThreshold={1}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          refreshing={this.state.refreshing}
          onRefresh={this.getTodos}
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

export default FindTodos;

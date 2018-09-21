import React from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
import { View, Text, Modal, TouchableOpacity, FlatList, Image } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { apiDeleteTodo } from '../../lib/api_calls';
import { styles } from './style';
import { Button, Input2, Spinner } from '../_shared';
import { Todo }from '../_shared/';
import Check from 'react-native-vector-icons/FontAwesome';
import Colors from '../../shared/colors'; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Check2 from 'react-native-vector-icons/FontAwesome';


class Profile extends React.Component {
  state = {
    openModal: false,
    finishTodo: false,
    toFinish: '',
    finished: [],
    todos: [],
    description: '',
    metaData: '',
    refreshing: false,
    list: 'Todo List',
    toDelete: '', 
    image: null,
    loading: false,
    status: '',
  };

  componentWillMount() {
    this.getTodos();
  }

  getTodos = async () => {
    this.setState({ refreshing: true, todos: [] });
    await this.props.getMyTodos();
    await this.setState({ todos: this.props.state.todos.payload, refreshing: false, list: 'Todo List' });
  };

  getTodoHistory = async () => {
    this.setState({ refreshing: true, todos: [] });
    await this.props.getUserHistory();
    await this.setState({ todos: this.props.state.todoHistory.payload, refreshing: false, list: 'Todo History' });
  }

  renderItem(todo) {
    return <Todo todo={todo} />
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ openModal: nextProps.state.todo.openModal });
  }

  async addTodo() {
    this.setState({ loading: true, status: 'add' });
    const { description, metaData } = this.state;
    await this.props.addTodo({ description, metaData });
    this.props.closeModal();
    this.setState({ todos: [...this.state.todos, this.props.state.todo.payload], status: ''});
  }

  openFinishTodo = (todo) => {
    this.setState({ finishTodo: true, toFinish: todo, toDelete: todo });
  };

  closeFinishTodo = () => {
    this.setState({ finishTodo: false, toFinish: '', toDelete: '' });
  };

  displayAddImageText = () => {
    if(this.state.image) {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Check2 size={26} color={Colors.main} name="check" />
          <Text style={{ fontWeight: '600', color: Colors.main, marginLeft: 4 }}>Photo added</Text>
        </View>
      );
    }
    return (
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => this.uploadImage()}>
        <Icon size={26} color={Colors.main} name="image" />
        <Text style={{ fontWeight: '600', color: Colors.main, marginLeft: 3 }}>Add a photo</Text>
      </TouchableOpacity>
    )
  };

  uploadImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: true,
      aspect: [1, 1],
      exif: false,
    });
    if (!result.cancelled) {
      await this.setState({
        image: result,
      });
    }   
  };

  finishTodo = async () => {
    await this.setState({ loading: true, status: 'finish' });
    if(this.state.image) {
      const buf = new Buffer(this.state.image.base64, 'base64');
      const splitURI = this.state.image.uri.split('.');
      const lastItem = splitURI.length - 1;
      const type = splitURI[lastItem];
      await this.props.getAwsUrl(type);
      await axios.put(this.props.state.awsUrl.url, buf, {
        headers: {
          'Content-Type': `image/${type}`,
          'Content-Encoding': 'base64',
        }
      });
    }

    await this.props.finishTodo({ id: this.state.toFinish, image: this.state.image ? `https://s3.amazonaws.com/mixdodev/${this.props.state.awsUrl.key}` : null });
    this.setState({ finishTodo: false, finished: [...this.state.finished, this.state.toFinish] , toFinish: '', image: null, loading: false, status: '' });
  };

  finishOrSpinner = () => {
    if(this.state.loading && this.state.status === 'finish') {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Spinner size="large" />
        </View>
      );
    }
    return (
      <TouchableOpacity onPress={() => this.finishTodo()}>
        <Check name="check-circle" size={150} style={styles.icon} color={Colors.secondary}/>
      </TouchableOpacity>
    );
  };

  addOrSpinner = () => {
    if(this.state.loading && this.state.status === 'add') {
      console.log('ayo');
      return (
        <Button>
          <Spinner size="small" />
        </Button>
      );
    }
    return (
      <Button onPress={() => this.addTodo()} style={{ backgroundColor: Colors.secondary }}>
        Add Todo
      </Button>
    );
  }

  deleteTodo = async () => {
    try {
      const deleted = await apiDeleteTodo({ id: this.state.toDelete });
      if (deleted.deleted === true) {
        const newTodos = this.state.todos.filter(todo => {
          return todo._id !== this.state.toDelete;
        });
        this.setState({ todos: newTodos, finishTodo: false });   
      }
    }
    catch(e) {
      alert('Could not delete this todo'); 
    }
  };

  render() {
    return (
      <View style={styles.containerStyle}>
        <View style={styles.optionsContainer}>
            <View>
              <Text style={styles.optionText}>{this.state.list === 'Todo List' ? 'Todo List' : 'Todo History'}</Text>
            </View>
            <View style={styles.rightContent1}>
              <TouchableOpacity onPress={() => this.getTodos()}>
                <Text style={styles.rightText2}>Todo list</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.getTodoHistory()}>
                <Text style={styles.rightText}>Todo history</Text>
              </TouchableOpacity>
            </View>  
          </View>

        <View style={styles.listStyle}>
          <FlatList
            data={this.state.todos}
            renderItem={(todo) => (
              <Todo todo={todo} openFinishTodo={this.openFinishTodo} finished={this.state.finished} />
            )}  
            keyExtractor={todo => todo._id}
            showsVerticalScrollIndicator={false}
            extraData={this.state.finished}
            refreshing={this.state.refreshing}
            onRefresh={this.getTodos}
          />
        </View>  

        <Modal
            transparent
            visible={this.state.openModal === true}
            onRequestClose={() => this.props.closeModal()}
          >
          <View style={styles.modalContainer}>
            <View style={styles.modalSubContainer}>
              <Text style={styles.modalHeader}>Add a Todo</Text>

              <Input2 labelText="Todo" placeholder="Do cool stuff" onChangeText={description => this.setState({ description })} />
              <Input2 labelText="Description" placeholder="#CoolStuff #Winning"  onChangeText={metaData => this.setState({ metaData })} />

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                <View style={{width: 100, marginRight: 15 }}>
                  {this.addOrSpinner()}
                </View>
                <TouchableOpacity onPress={() => this.props.closeModal() }>
                  <Text style={{ fontSize: 16, color: Colors.main, fontWeight: '500' }}>Cancel</Text>
                </TouchableOpacity>  
              </View>
            </View>
          </View>  
        </Modal> 

        <Modal
            transparent
            visible={this.state.finishTodo === true}
            onRequestClose={() => this.setState({ finishTodo: false })}
          >
          <View style={styles.modalContainer}>
            <View style={styles.modalSubContainer2}>
              <Text style={styles.modalHeader}>Finish Todo</Text>
              <View>
                {this.displayAddImageText()}
              </View>

              <View style={{ alignItems: 'center', paddingBottom: 20 }}>
                {this.finishOrSpinner()}
                <Text style={{ color: 'gray' }}>tap to finish</Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                <View style={{ marginRight: 30 }}>
                  <TouchableOpacity onPress={() => this.closeFinishTodo()}>
                    <Text style={{ fontSize: 16, color: 'gray' }}>Cancel</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => this.deleteTodo()}>
                  <Text style={{ fontSize: 16, color: '#FE4C4B' }}>Delete Todo</Text>
                </TouchableOpacity>  
              </View>
            </View>
          </View>  
        </Modal> 
      </View> 
    );
  }
}

export default Profile;

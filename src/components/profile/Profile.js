import React from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
import { View, Text, Modal, TouchableOpacity, FlatList, Image } from 'react-native';
import { ImagePicker, Camera, Permissions, ImageManipulator } from 'expo';
import { apiDeleteTodo } from '../../lib/api_calls';
import { styles } from './style';
import { Button, Input2, Spinner } from '../_shared';
import { Todo }from '../_shared/';
import Check from 'react-native-vector-icons/FontAwesome';
import Colors from '../../shared/colors'; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Check2 from 'react-native-vector-icons/FontAwesome';
import CameraIcon from 'react-native-vector-icons/FontAwesome';
import FlashOff from 'react-native-vector-icons/MaterialIcons';
import FlashOn from 'react-native-vector-icons/MaterialIcons';
import Flip from 'react-native-vector-icons/MaterialCommunityIcons';


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
    openCamera: false,
    flashMode: Camera.Constants.FlashMode.off,
    photoOptions: false,
    type: Camera.Constants.Type.back,
    cameraLoad: false,
    cameraLoad2: false,
    snap: true,
    darkModal: false,
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
    if(nextProps.state.todo.openModal === true) {
      setTimeout(() => {
        this.setState({ openModal: nextProps.state.todo.openModal, });
      }, 80)
      this.setState({ darkModal: true });
    }
    if(nextProps.state.todo.openModal === false) {
      setTimeout(() => {
        this.setState({ darkModal: false });
      }, 80);
      this.setState({ openModal: nextProps.state.todo.openModal });
    }
  }

  async addTodo() {
    this.setState({ loading: true, status: 'add' });
    const { description, metaData } = this.state;
    await this.props.addTodo({ description, metaData, createdDate: new Date(Date.now()).toString() });
    this.props.closeModal();
    this.setState({ todos: [...this.state.todos, this.props.state.todo.payload], status: '', description: '', metaData: '', loading: false });
  }

  openFinishTodo = (todo) => {
    setTimeout(() => {
      this.setState({ finishTodo: true, toFinish: todo, toDelete: todo });
    }, 80)
    this.setState({ darkModal: true });
  };

  closeFinishTodo = () => {
    setTimeout(() => {
      this.setState({ darkModal: false });
    }, 80); 
    this.setState({ finishTodo: false, toFinish: '', toDelete: '', image: null });
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
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => this.setState({ photoOptions: true })}>
        <Icon size={26} color={Colors.main} name="image" />
        <Text style={{ fontWeight: '600', color: Colors.main, marginLeft: 3 }}>Add a photo</Text>
      </TouchableOpacity>
    )
  };

  SnapOrSpinner = () => {
    if(this.state.snap) {
      return <View style={{ width: 30, height: 30 }}><CameraIcon size={20} color={Colors.main} name="camera" /></View>;
    }
    return <View style={{ width: 30, height: 30 }}><Spinner color="gray" size="small" /></View>;
  }

  renderFlash = () => {
    if(this.state.flashMode === Camera.Constants.FlashMode.on) {
      return ( 
        <TouchableOpacity onPress={() => this.toggleFlash()}>
          <FlashOn name="flash-on" size={24} color="#ffffff" />
        </TouchableOpacity>
      )
    }
    return ( 
      <TouchableOpacity onPress={() => this.toggleFlash()}>
        <FlashOn name="flash-off" size={24} color="#ffffff" />
      </TouchableOpacity>
    )
  };

  toggleFlash = () => {
    if(this.state.flashMode === Camera.Constants.FlashMode.on) {
      return this.setState({ flashMode: Camera.Constants.FlashMode.off });
    }
    if(this.state.flashMode === Camera.Constants.FlashMode.off) {
      return this.setState({ flashMode: Camera.Constants.FlashMode.on });
    }
  };

  toggleType = () => {
    if(this.state.type === Camera.Constants.Type.back) {
      return this.setState({ type: Camera.Constants.Type.front });
    }
    if(this.state.type === Camera.Constants.Type.front) {
      return this.setState({ type: Camera.Constants.Type.back });
    }
  };

  openCamera = async () => {
    await this.setState({ snap: false });
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if(status !== 'granted') {
      return;
    }
    this.setState({ openCamera: true });
  };

  uploadImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (!result.cancelled) {
      await this.setState({
        image: result,
        photoOptions: false,
      });
    }   
  };

  takePicture = async () => {
    await this.setState({ cameraLoad2: true, snap: true });
    await this.setState({ cameraLoad2: false });
    setTimeout( async () => {
      await this.setState({ cameraLoad: true });
      let photo = await this.camera.takePictureAsync();
      await this.setState({ image: photo, openCamera: false, photoOptions: false, cameraLoad: false });
    }, 100);
  };

  renderImageWhilePhotoLoading = () => {
    if(this.state.cameraLoad2) {
      return (
        <View style={{ width: '100%', aspectRatio: 1/1  }}></View>
      );
    }
    return <Camera autoFocus={Camera.Constants.AutoFocus.on} ratio="1:1" type={this.state.type} flashMode={this.state.flashMode} ref={ref => { this.camera = ref; }} style={{ width: '100%', aspectRatio: 1/1  }} />;
  };

  finishTodo = async () => {
    setTimeout(() => {
      this.setState({ darkModal: false });
    }, 200);
    await this.setState({ loading: true, status: 'finish' });
    if(this.state.image) {
      const manipResult = await ImageManipulator.manipulate(
        this.state.image.uri,
        [{ resize: { width: 1080, height: 1080 }}],
        { base64: true, compress: 0.6 }
      );
      const buf = new Buffer(manipResult.base64, 'base64');
      const splitURI = this.state.image.uri.split('.');
      const lastItem = splitURI.length - 1;
      const type = splitURI[lastItem];
      await this.props.getAwsUrl(type);
      axios.put(this.props.state.awsUrl.url, buf, {
        headers: {
          'Content-Type': `image/${type}`,
          'Content-Encoding': 'base64',
        }
      });
    }

    await this.props.finishTodo({ id: this.state.toFinish, image: this.state.image ? `https://s3.amazonaws.com/${this.props.state.awsUrl.bucket}/${this.props.state.awsUrl.key}` : null, createdDate: new Date(Date.now()).toString() });
    this.setState({ finishTodo: false, finished: [...this.state.finished, this.state.toFinish] , toFinish: '', image: null, loading: false, status: '' });
  };

  finishOrSpinner = () => {
    if(this.state.loading && this.state.status === 'finish') {
      return (
        <View style={{ marginBottom: 30 }}>
          <Spinner size="large" color="gray" />
        </View>
      );
    }
    return (
      <TouchableOpacity onPress={() => this.finishTodo()}>
        <Check name="check-circle" size={150}  color={Colors.secondary}/>
      </TouchableOpacity>
    );
  };

  cameraOrSpinner = () => {
    if(this.state.cameraLoad) {
      return (
        <Spinner />
      )
    }
    return (
      <TouchableOpacity onPress={() => this.takePicture()}>
        <CameraIcon name="camera" size={24} color="#ffffff" />
      </TouchableOpacity>
    );
  };

  addOrSpinner = () => {
    if(this.state.loading && this.state.status === 'add') {
      return (
        <View style={styles.spinnerButton}>
          <Spinner size="small" />
        </View>
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
        setTimeout(() => {
          this.setState({ darkModal: false });
        }, 80);
        this.setState({ todos: newTodos, finishTodo: false });   
      }
    }
    catch(e) {
      alert('Could not delete this todo'); 
    }
  };

  zeroTodos = () => {
    if(this.state.todos.length === 0 && !this.state.refreshing) {
      return (
        <View style={styles.zeroContainer}>
          <Text style={styles.zeroText}>Add some todos!</Text>
          <Text style={styles.zeroText}>When you add todos other users can view, like, or add them</Text>
        </View>
      );
    }
    return <View></View>;
  };

  onKeyPress = async description => {
    await this.setState({ description });
  };

  onKeyPress2 = (key) => {
    console.log('hi')
  }

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
          {this.zeroTodos()}
          
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
        <Modal transparent visible={this.state.darkModal} animationType="fade" onRequestClose={() => this.props.closeModal()}>
            <View style={styles.modalContainerii}></View>
        <Modal
            transparent
            visible={this.state.openModal === true}
            onRequestClose={() => this.props.closeModal()}
            animationType="slide"
          >
          <View style={styles.modalContainer}>
            <View style={styles.modalSubContainer}>
              <Text style={styles.modalHeader}>Add a Todo</Text>

              <Input2 labelText="Todo" placeholder="Do cool stuff" onChangeText={description => this.onKeyPress(description)} onKeyPress={press => this.onKeyPress2(press)}/>
              <Input2 labelText="Tags" placeholder="#fitness, #business, #hustle, etc."  onChangeText={metaData => this.setState({ metaData })} />

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
            animationType="slide"
          >
          <View style={styles.modalContainer}>
            <View style={styles.modalSubContainer2}>
              <Text style={styles.modalHeader}>Finish Todo</Text>
              <View>
                {this.displayAddImageText()}
              </View>

              <View style={{ alignItems: 'center', justifyContent: 'center', paddingBottom: 20 }}>
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

            <Modal
              transparent
              visible={this.state.photoOptions}
              onRequestClose={() => this.setState({ photoOptions: false })}
              animationType="fade"
            >
            <View style={styles.modalContainerii}>
              <View style={styles.modalSubContainer3}>
                <View style={{ width: 145, height: 200, justifyContent: 'center' }}>
                  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }} onPress={() => this.uploadImage()}>
                    <View style={{ width: 30 }}>
                      <Icon size={26} color={Colors.main} name="image" />
                    </View>
                    <Text style={{ fontWeight: '600', color: Colors.main, marginLeft: 5 }}>Add from gallery</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12, marginLeft: 2 }} onPress={() => this.openCamera()}>
                    {this.SnapOrSpinner()}
                    <Text style={{ fontWeight: '600', color: Colors.main, marginLeft: 5, height: 30 }}>Snap a photo</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ position: 'absolute', marginTop: 170 }} onPress={() => this.setState({ photoOptions: false, finishTodo: true })}>
                  <Text style={{ color: 'lightgray' }}>Back</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Modal
              transparent
              visible={this.state.openCamera}
              onRequestClose={() => this.setState({ openCamera: false, snap: true })}
            >
              <View style={styles.cameraModalContainer}>
                <TouchableOpacity onPress={() => this.setState({ openCamera: false, snap: true })}>
                  <Text style={styles.cameraActionText}>Close</Text>
                </TouchableOpacity>

                {this.renderImageWhilePhotoLoading()}

                <View style={styles.cameraActionsContainer}>
                  <TouchableOpacity onPress={() => this.toggleType()}>
                    <Flip name="rotate-3d" size={24} color="#ffffff" />
                  </TouchableOpacity>
                    {this.cameraOrSpinner()}
                  <TouchableOpacity>
                    {this.renderFlash()}
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </Modal> 
        </Modal>
        </Modal>
      </View> 
    );
  }
}

export default Profile;

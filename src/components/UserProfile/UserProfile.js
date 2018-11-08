import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { styles } from './styles';
import { Todo } from '../_shared';

class UserProfile extends React.Component {
  state = {
    photo: this.props.state.profile.payload ? this.props.state.profile.payload.user.photo : [],
    type: 'Todo List',
    todos: []
  };

  async componentWillMount() {
    const id = this.props.navigation.getParam('_id');
    await this.props.getUserProfile(id);
  }

  renderProfileImage = () => {
    const { payload } = this.props.state.profile;
    if(payload){
      if(payload.user.photo) {
        return <Image style={styles.profileImage} resizeMode="cover" source={{ uri: payload.user.photo }}/>
      }
    }
    return <Image style={styles.profileImage} source={require('../../../assets/blank-profile.png')} />
  };

  renderName = () => {
    const { payload } = this.props.state.profile;
    if(payload){
      return `${payload.user.fullName}`
    }
    return 'No Name';
  };

  renderItem(todo) {
    return <Todo todo={todo} finished={[]} />
  }

  render() {
    return (
      <View style={styles.mainConainer}>
        <View style={styles.subContainer}>
          <View style={styles.backButton}>

          </View>
          <View style={styles.photoContainer}>
            {this.renderProfileImage()}
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{this.renderName()}</Text>
          </View>
        </View>  

        <View style={styles.todosContainer}>
          <View style={styles.todoTop}>

            <View>
              <Text style={styles.todoTitleText}>{this.state.type}</Text>
            </View>

            {/* <View style={styles.todoTopRight}>
              <TouchableOpacity style={{ marginRight: 20 }}>
                <Text style={styles.optionText}>Todo List</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.optionText}>Completed Todos</Text>
              </TouchableOpacity>
            </View> */}

          </View>

          <View style={{ flex: 1 }}>
            <FlatList
              data={this.props.state.profile.payload ? this.props.state.profile.payload.todos : []}
              renderItem={this.renderItem}
              keyExtractor={todo => todo._id}
              showsVerticalScrollIndicator={false}
            />
          </View>


        </View>

      </View>
    );
  }
}

export default UserProfile;

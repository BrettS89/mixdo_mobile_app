import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Check from 'react-native-vector-icons/FontAwesome';
import Circle from 'react-native-vector-icons/Foundation';
import Colors from '../../shared/colors';

class Todo extends React.Component {
  state = { iconColor: '#ffffff', finished: Colors.main,  };

  renderIcon = () => {
    if(this.props.todo.item.finished || this.props.finished.indexOf(this.props.todo.item._id) > -1) {
      return (
        <Check name="check-circle" size={27} style={styles.icon} color={this.state.iconColor}/>
      );
    }
    return <Circle name="flag" size={27} style={styles.icon} color={Colors.main}/>;
  };

  renderTodo = () => {
    const { description, metaData } = this.props.todo.item;
    if(this.props.todo.item.list) {
      return (
        <TouchableOpacity style={styles.todoContainer} onPress={() => this.props.openFinishTodo(this.props.todo.item._id)}>
          <View style={{ backgroundColor:  this.props.todo.item.finished || this.props.finished.indexOf(this.props.todo.item._id) > -1 ? Colors.secondary : '#E9EBEE', height: '100%', width: 39, marginRight: 14, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
          {this.renderIcon()}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.todoText}>{description}</Text>
            <Text style={styles.subText}>{metaData}</Text>
          </View>  
        </TouchableOpacity>
      );
    }
    if(this.props.flat) {
      return (
        <View style={styles.todoContainer2}>
          <View style={{ backgroundColor:  this.props.todo.item.finished ? Colors.secondary : '#E9EBEE', height: '100%', width: 39, marginRight: 14, justifyContent: 'center', alignItems: 'center' }}>
            {this.renderIcon()}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.todoText}>{description}</Text>
            <Text style={styles.subText}>{metaData}</Text>
          </View>
        </View>
      )
    }
    return (
      <View style={styles.todoContainer}>
        <View style={{ backgroundColor:  this.props.todo.item.finished ? Colors.secondary : '#E9EBEE', height: '100%', width: 39, marginRight: 14, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
          {this.renderIcon()}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.todoText}>{description}</Text>
          <Text style={styles.subText}>{metaData}</Text>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View>
        {this.renderTodo()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  todoContainer: {
    // padding: 10,
    paddingLeft: 0,
    height: 90,
    marginRight: 2,
    marginTop: 9,
    marginBottom: 2,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#ffffff',
    borderColor: '#eaeaea',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000000',
      shadowOffset: {
        width: -1,
        height: 1
      },
      shadowRadius: 2,
      shadowOpacity: 0.1,
      elevation: 1
  },
  todoContainer2: {
    height: 90,
    marginTop: 9,
    borderTopWidth: 1,
    borderBottomWidth: 0,
    backgroundColor: '#ffffff',
    borderColor: '#eaeaea',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {

  },
  todoText: {
    fontSize: 14,
    flexWrap: 'wrap',
    marginBottom: 6,
    color: Colors.logo,
  },
  subText: {
    flexWrap: 'wrap',
    fontSize: 13,
    color: '#ababab'
  },
  textContainer: {
    flexWrap: 'wrap',
    width: '80%'
  },
  // todoStatus: {
  //   backgroundColor:  this.props.todo.item.finished ? Colors.secondary : Colors.main, 
  //   height: '100%', 
  //   width: 60, 
  //   marginRight: 10, 
  //   justifyContent: 'center', 
  //   alignItems: 'center', 
  //   borderTopLeftRadius: 4, 
  //   borderBottomLeftRadius: 4
  // }
})

export { Todo };

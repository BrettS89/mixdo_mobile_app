import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { openModal } from '../../../store/actions/addTodo';
import Icon from 'react-native-vector-icons/FontAwesome';

class AddTodoButton extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.openModal()}>
        <View style={{ marginRight: 15, flexDirection: 'row' }}>
          <View>
          <Icon name="plus-circle" size={28} color="#ffffff" />
          </View>
          <Text style={{ paddingTop: 6, marginLeft: 4, fontSize: 13, fontWeight: '600', color: '#ffffff' }}>Add Todo</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default connect(null, { openModal })(AddTodoButton);

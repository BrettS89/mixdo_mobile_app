import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import PublicPost from '../_shared/PublicPost';

class PublicTodos extends React.Component {

  componentDidMount() {
    this.props.getPublicTodos();
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={{ flex: 1 }}>
          <FlatList 
          data={this.props.state.publicTodos ? this.props.state.publicTodos : []}
          keyExtractor={todo => todo._id}
          showsVerticalScrollIndicator={false}
          renderItem={(todo) => (
            <PublicPost 
              todo={todo} 
             />
          )}
        />

        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { borderWidth: 3 }]} onPress={() => this.props.navigation.navigate('Signup')}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default PublicTodos;

import { StyleSheet } from 'react-native';
import Colors from '../../shared/colors';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  searchContainer: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
    paddingLeft: 15,
    paddingRight: 15
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  modalSubContainer: {
    backgroundColor: '#ffffff', 
    height: 400, 
    width: 320,
    padding: 30,
    alignItems: 'center',
    borderRadius: 6
  },
  modalSubContainer2: {
    justifyContent: 'center',
    backgroundColor: '#ffffff', 
    height: 200, 
    width: 320,
    padding: 30,
    alignItems: 'center',
    borderRadius: 6
  },
  flagContent: {
    marginBottom: 15,
  },
  flagContentText: {
    color: Colors.main,
    fontWeight: '600',
  },
  deleteTodo: {
    marginBottom: 15,
  },
  deleteTodoText: {
    fontWeight: '600',
    color: '#FE4C4B',
  },
  cancelText: {
    color: 'gray',
    fontSize: 13,
  }
});
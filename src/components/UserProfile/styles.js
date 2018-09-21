import { StyleSheet } from 'react-native';
import Colors from '../../shared/colors';

export const styles = StyleSheet.create({
  mainConainer: {
    flex: 1,
    padding: 15,
    backgroundColor: '#ffffff'
  },
  backText: {
    color: Colors.main,
  },
  subContainer: {
    paddingLeft: 35,
    paddingRight: 35
  },
  photoContainer: {
    alignItems: 'center'
  },
  profileImage: {
    height: 100,
    borderRadius: 50,
    width: 100
  },
  uploadContainer: {
    alignItems: 'center',
    margin: 7  
  },
  contentContainer: {
    height: '70%',
    marginTop: 10,
    justifyContent: 'space-between'
  },
  nameContainer: {
    alignItems: 'center',
    margin: 10
  },
  nameText: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 5
  },
  contentTop: {
  },
  todosContainer: {
    flex: 1
  },
  todoTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    paddingBottom: 5,
    marginBottom: 5
  },
  todoTopRight: {
    flexDirection: 'row'
  },
  todoTitleText: {
    fontWeight: '600',
    color: Colors.main
  },
  optionText: {
    color: Colors.main
  }
});
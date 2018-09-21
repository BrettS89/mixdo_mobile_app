import { StyleSheet } from 'react-native';
import Colors from '../../shared/colors';

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#ffffff',
    flex: 1
  },
  searchContainer: {
    marginLeft: 15,
    marginRight: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
  },
  userCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
    backgroundColor: '#ffffff'
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileImage: {
    height: 60,
    borderRadius: 30,
    width: 60,
    marginRight: 13,
  },
  userText: {
    fontWeight: '600'
  },
  rightContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 30
  },
  followingText: {
    fontSize: 12,
    color: Colors.secondary,
  }  
});
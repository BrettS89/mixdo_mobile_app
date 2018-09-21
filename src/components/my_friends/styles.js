import { StyleSheet } from 'react-native';
import Colors from '../../shared/colors';

export const styles = StyleSheet.create({
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8'
  },
  optionText: {
    fontSize: 13,
    fontWeight: '600'
  },
  rightContent1: {
    flexDirection: 'row',
  },
  rightText: {
    fontSize: 13,
    color: '#2196F3'
  },
  rightText2: {
    fontSize: 13,
    color: '#2196F3',
    marginRight: 25
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
  followText: {
    fontSize: 11,
    color: Colors.secondary,
    marginLeft: 4
  }
});
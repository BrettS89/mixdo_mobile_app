import { StyleSheet } from 'react-native';
import Colors from '../../shared/colors';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F6F6F6'
  },
  userCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
    backgroundColor: '#ffffff',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightContent: {
    width: '85%'
  },
  profileImage: {
    height: 60,
    borderRadius: 30,
    width: 60,
    marginRight: 13,
  },
  userText: {
    width: '90%',
    fontWeight: '600',
    fontSize: 13
  },
  typeText: {
    width: '100%',
    fontWeight: '600',
    fontSize: 13,
    color: Colors.secondary,
    marginBottom: 5,
  }
});

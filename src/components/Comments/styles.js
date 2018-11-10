import { StyleSheet } from 'react-native';
import Colors from '../../shared/colors';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // justifyContent: 'space-between',
    // height: '100%',
    backgroundColor: '#ffffff',
  },
  searchContainer: {
    // position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    height: 65,
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    // backgroundColor: Colors.main,
    // left: 0,
    // right: 0,
    // bottom: 0
  },
  sendContainer: { 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  userCardContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    // padding: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: '#e8e8e8',
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
    height: 34,
    borderRadius: 17,
    width: 34,
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
    // color: Colors.secondary,
    // marginBottom: 5,
  },
  commentText: {
    fontSize: 13,
    color: 'gray',
  }
});
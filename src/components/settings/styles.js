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
    fontSize: 14,
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
  uploadText: {
    color: Colors.main,
    fontSize: 13
  },
  contentContainer: {
    height: '70%',
    marginTop: 10,
    justifyContent: 'space-between'
  },
  nameContainer: {
    alignItems: 'center'
  },
  nameText: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 40
  },
  contentTop: {
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30
  },
  contentBottom: {

  }
});

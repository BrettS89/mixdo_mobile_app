import { StyleSheet } from 'react-native';
import Colors from '../../shared/colors';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  loginFormContainer: {
    width: 350,
    height: '100%',
    justifyContent: 'center',
    borderRadius: 3,
    padding: 50,
    backgroundColor: '#ffffff',
    // borderWidth: 1,
    borderColor: '#eaeaea',
    // shadowColor: '#000000',
    //   shadowOffset: {
    //     width: 0,
    //     height: 3
    //   },
    //   shadowRadius: 5,
    //   shadowOpacity: 0.1
  },
  logoContainer: {
    alignItems: 'center'
  },
  logo: {
    fontSize: 30,
    marginTop: 15,
    color: Colors.main,
    fontWeight: '500'
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: Colors.main,
    borderRadius: 4,
    height: 40
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 15
  },
  tcContainer: {
    flexDirection:'row',
    marginTop: 35,
  },
  tcText: {
    color: 'gray',
    fontSize: 11,
  },
  tcText2: {
    color: 'gray',
    fontSize: 11,
    fontWeight: '700',
  }
});
import { StyleSheet } from 'react-native';
import Colors from '../../shared/colors';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  signupFormContainer: {
    width: 350,
    height: '100%',
    justifyContent: 'center',
    borderRadius: 3,
    padding: 50,
    paddingTop: 38,
    backgroundColor: '#ffffff',
    borderColor: '#eaeaea',
  },
  logoContainer: {
    alignItems: 'center'
  },
  logo: {
    fontSize: 30,
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
})
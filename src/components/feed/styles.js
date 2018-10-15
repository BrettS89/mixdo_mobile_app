import { StyleSheet } from 'react-native';
import Colors from '../../shared/colors';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#E9EBEE',
  },
  zeroContainer: {
    backgroundColor: '#E9EBEE',
    marginTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zeroText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 10,
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
    marginBottom: 25,
  },
  flagContentText: {
    color: Colors.main,
    fontWeight: '600',
  },
  cancelText: {
    color: 'gray',
    fontSize: 13,
  }
});
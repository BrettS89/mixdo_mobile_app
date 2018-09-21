import { StyleSheet } from 'react-native';
import Colors from '../../shared/colors';

export const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '#FBFBFB'
  },
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
    color: Colors.main,
  },
  rightText2: {
    fontSize: 13,
    color: Colors.main,
    marginRight: 25
  },
  listStyle: {
    paddingLeft:10,
    paddingRight: 10,
    flex: 1,
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
    justifyContent: 'space-between',
    backgroundColor: '#ffffff', 
    height: 400, 
    width: 320,
    padding: 30,
    alignItems: 'center',
    borderRadius: 6
  },
  modalHeader: {
    marginBottom: 15,
    fontSize: 24,
    fontWeight: '500',
    color: Colors.main
  }
});

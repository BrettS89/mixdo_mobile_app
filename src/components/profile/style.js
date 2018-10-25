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
  modalContainerii: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  modalContainer: {
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  cameraModalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    flex: 1, 
    justifyContent: 'space-around', 
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
  modalSubContainer3: {
    backgroundColor: '#ffffff', 
    height: 200, 
    width: 260,
    alignItems: 'center',
    borderRadius: 6
  },
  modalHeader: {
    marginBottom: 15,
    fontSize: 24,
    fontWeight: '500',
    color: Colors.main
  },
  spinnerButton: {
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: Colors.main,
    borderRadius: 4,
    height: 40
  },
  zeroContainer: {
    flex: 1,
    marginTop: 90,
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
  cameraActionsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    // paddingHorizontal: 20,
  },
  cameraActionText: {
    color: '#ffffff',
  }
});

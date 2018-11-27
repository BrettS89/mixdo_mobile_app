import { StyleSheet } from 'react-native';
import colors from '../../shared/colors';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#E9EBEE',
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.main,
    width: '100%',
    paddingHorizontal: '10%',
    justifyContent: 'space-around',
    paddingBottom: 40,
    // borderTopWidth: 1,
    borderTopColor: 'lightgray',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 5,
    marginTop: 40,
    borderColor: '#ffffff',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  }
});

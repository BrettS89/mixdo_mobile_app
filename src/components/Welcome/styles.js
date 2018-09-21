import { StyleSheet } from 'react-native';
import Colors from '../../shared/colors';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    paddingTop: 60,
  },
  centerContent: {
    alignItems: 'center',
  },
  welcomeText: {
    marginTop: 30,
    marginBottom: 110,
    color: Colors.main,
    fontSize: 26,
    fontWeight: '600',
  },
  profileImage: {
    height: 150,
    borderRadius: 75,
    width: 150,
    marginBottom: 12
  },
  finishButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  buttonText: {
    fontWeight: '600', 
    color: Colors.main, 
    fontSize: 18,
  }
});

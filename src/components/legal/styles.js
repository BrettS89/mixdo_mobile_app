import { StyleSheet } from 'react-native';
import Colors from '../../shared/colors';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  backButton: {
    marginTop: 20
  },
  backButtonText: {
    color: Colors.main,
    fontSize: 12,
    marginBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.main,
  },
  bodyContainer: {
    marginTop: 10,
  },
  legalButton: {
    marginBottom: 15,
  },
  legalText: {
    color: Colors.main,
    fontWeight: '600',
  }
});
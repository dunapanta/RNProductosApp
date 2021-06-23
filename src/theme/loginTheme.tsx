import {StyleSheet} from 'react-native';
import Colors from '../constants/Colors';

export const loginStyles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    paddingHorizontal: 26,
    justifyContent: 'center',
    height: 600,
    marginBottom: 50,
  },
  title: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 20,
  },
  label: {
    marginTop: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  inputField: {
    color: 'white',
    fontSize: 20,
  },
  inputFieldiOS: {
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    paddingBottom: 3,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  button: {
    borderWidth: 2,
    borderColor: 'white',
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 50,
    backgroundColor: Colors.secondary,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  newUserContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
});
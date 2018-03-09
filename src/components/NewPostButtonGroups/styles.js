import { StyleSheet } from 'react-native';
import {
  colors as c,
  borders as br,
  fontSizes as fs,
  fontColors as fc
} from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: c.$white,
    borderWidth: br.$light,
    borderColor: c.$borderColor__dark
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: fs.$default,
    color: fc.$default
  }
});

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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: c.$white,
    borderWidth: br.$default,
    borderColor: c.$borderColor__dark
  },
  button: {
    width: 60,
    height: 60
  }
});

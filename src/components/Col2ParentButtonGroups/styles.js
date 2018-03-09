import { StyleSheet } from 'react-native';
import {
  colors as c,
  borders as br,
  fontSizes as fs,
  fontColors as fc
} from '../../styles';

export default StyleSheet.create({
  container: {
    height: 66,
    flexDirection: 'row',
    borderWidth: br.$default,
    borderColor: c.$borderColor__dark
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  icon: {
    height: 66,
    resizeMode: 'contain'
  }
});

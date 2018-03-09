import { StyleSheet } from 'react-native';
import {
  colors as c,
  borders as br,
  fontSizes as fs,
  fontColors as fc
} from '../../styles';

export default StyleSheet.create({
  container: {
    marginTop: 4,
    minHeight: 45,
    borderColor: c.$borderColor__dark,
    borderWidth: .2,
    paddingLeft: 19,
    justifyContent: 'center'
  },
  text: {
    fontSize: fs.$default,
    color: fc.$headerTextDefault,
    textAlign: 'left'
  }
});

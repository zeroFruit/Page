import { StyleSheet } from 'react-native';
import {
  colors as c,
  borders as br,
  fontSizes as fs,
  fontColors as fc
} from '../../styles/index';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: br.$light,
    borderColor: c.$borderColor__dark,
    backgroundColor: c.$grayColor,
    justifyContent: 'center',
    alignItems: 'center',
    height: 70
  },
  icon: {
    width: 16.3,
    height: 17,
    marginRight: 12.5
  },
  text: {
    fontSize: fs.$default,
    color: fc.$default
  }
});

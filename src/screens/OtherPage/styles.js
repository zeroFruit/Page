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
    flexDirection: 'column',
    paddingTop: 4,
    paddingHorizontal: 0,
    backgroundColor: 'white'
  },
  top: {
  },
  body: {
    flex: 1,
    paddingTop: 4,
    flexDirection: 'column'
  }
});

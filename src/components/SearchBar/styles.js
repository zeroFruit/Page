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
    height: 56
  },
  searchbarText: {
    fontSize: fs.$medium,
    textAlign: 'left'
  }
});

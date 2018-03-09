import { StyleSheet } from 'react-native';
import {
  colors as c,
  borders as br,
  fontSizes as fs,
  fontColors as fc
} from '../../styles';

export default StyleSheet.create({
  tabContainer: {
    flexDirection: 'row'
  },
  tab: {
    flex: 1,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: br.$default,
    borderColor: c.$borderColor__dark,
    backgroundColor: c.$lightGrayColor
  },
  icon: {
    width: 118,
    height: 44
  }
});

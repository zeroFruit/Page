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
    paddingTop: 16.5,
    borderTopWidth: br.$default,
    borderBottomWidth: br.$default,
    borderColor: c.$borderColor__dark,
    backgroundColor: 'white'
  },
  labelContainer: {
    justifyContent: 'center',
    paddingLeft: 23
  },
  labelText: {
    fontSize: fs.$medium,
    color: fc.$default,
    textAlign: 'left'
  },
  textAreaContainer: {
    paddingTop: 5,
    justifyContent: 'center',
    paddingLeft: 23,
    paddingRight: 23
  },
  textArea: {
    fontSize: fs.$default,
    textAlignVertical: 'top',
    fontFamily: 'NotoSansCJKkr-DemiLight'
  }
});

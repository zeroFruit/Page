import { StyleSheet } from 'react-native';
import {
  colors as c,
  borders as br,
  fontSizes as fs,
  fontColors as fc
} from '../../styles';
import { SCREEN_WIDTH } from '../../config';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  preview: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    height: SCREEN_WIDTH,
    resizeMode: 'cover',
    alignSelf: 'stretch',
    backgroundColor: 'white',
    // transform: [
    //   {
    //     rotate: '90deg'
    //   }
    // ]
  }
});

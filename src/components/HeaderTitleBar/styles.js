import { StyleSheet } from 'react-native';
import {
  colors as c,
  borders as br,
  fontSizes as fs,
  fontColors as fc
} from '../../styles';

export default StyleSheet.create({
  tagsContainer: {
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        left: 50,
        right: 50,
        height: 50,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
  textContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: fs.$large
  },
  icon: {
    width: 62.5,
    height: 29
  }
});

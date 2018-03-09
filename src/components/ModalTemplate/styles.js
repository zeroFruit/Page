import { StyleSheet } from 'react-native';
import {
    colors as c,
    borders as br,
    fontSizes as fs,
    fontColors as fc
} from '../../styles';

export default StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: 10,
        justifyContent: 'center',
        backgroundColor:'rgba(0, 0, 0, 0.5)',
    },
    inner: {
        alignItems: 'center',
        backgroundColor: 'transparent'
    }
});

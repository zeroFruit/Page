import { StyleSheet } from 'react-native';
import {
    colors as c,
    borders as br,
    fontSizes as fs,
    fontColors as fc
} from '../../styles';

export default StyleSheet.create({
    imageContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: 29
    },
    icon: {
        width: 62.5,
        height: 29,
        resizeMode: 'contain',
        alignSelf: 'center'
    }
});

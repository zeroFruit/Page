import { StyleSheet } from 'react-native';
import {
    colors as c,
    borders as br,
    fontSizes as fs,
    fontColors as fc
} from '../../styles';

export default StyleSheet.create({
    container: {
        width: 60,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0
    },
    labelText: {
        fontSize: fs.$headerTextDefault,
        color: fc.$headerTextDefault
    }
});

import { StyleSheet } from 'react-native';
import {
    colors as c,
    borders as br,
    fontSizes as fs,
    fontColors as fc
} from '../../styles';

export default StyleSheet.create({
    container: {
        minHeight: 80,
        paddingTop: 10.3,
        paddingRight: 19.5,
        paddingBottom: 12.3,
        paddingLeft: 20.5,
        backgroundColor: c.$white,
    },
    text: {
        flex: 1,
        fontSize: 13,
        color: fc.$default
    },
    footer: {
        fontSize: fs.$default,
        color: fc.$default,
        fontWeight: '500',
        lineHeight: 10
    }
});

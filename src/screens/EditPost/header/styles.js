import { StyleSheet } from 'react-native';
import {
    colors as c,
    borders as br,
    fontSizes as fs,
    fontColors as fc
} from '../../../styles';

export default StyleSheet.create({
    header: {
        backgroundColor: c.$white,
        borderWidth: .2,
        borderColor: br.$borderColor__dark
    },
    headerText: {
        fontSize: fs.$large,
        color: c.$default
    }
});

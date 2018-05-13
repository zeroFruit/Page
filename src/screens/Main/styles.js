import { StyleSheet } from 'react-native';
import {
    colors as c,
    borders as br,
    fontSizes as fs,
    fontColors as fc
} from '../../styles';

export default StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        flex: 1,
    },
    header: {
        alignItems: 'stretch',
        backgroundColor: 'white'
    },
    headerText: {
        fontSize: 20,
        textAlign: 'center'
    }
});

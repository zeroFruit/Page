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
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    top: {
        height: 56,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        borderWidth: 0.8,
        borderColor: c.$borderColor__dark
    },
    body: {
        flex: 1,
        backgroundColor: 'white'
    },
    iconContainer: {
        width: 38,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 38,
        height: 48
    },
    emptyResultContainer: {
        marginTop: 4,
        borderWidth: 0.8,
        borderColor: '#cccccc',
        padding: 19
    },
    emptyResultText: {
        fontSize: 12.5,
        color: '#656565'
    }
});

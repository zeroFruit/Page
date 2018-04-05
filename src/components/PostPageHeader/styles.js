import { StyleSheet } from 'react-native';
import {
    colors as c,
    borders as br,
    fontSizes as fs,
    fontColors as fc
} from '../../styles';

export default StyleSheet.create({
    container: {
        flexDirection: 'column',
        borderWidth: .5,
        borderColor: c.$borderColor__dark,

        justifyContent: 'center',
        alignItems: 'center',

        minHeight: 84,

        marginTop: 5,
        marginBottom: 5,
    },
    text: {
        fontSize: 12.5,
        color: fc.$default
    },
    seemore: {
        fontSize: 7.5,
        color: '#b0b0b0'
    },
    seeMore: {
        marginTop: -5
    },
    title: {
        marginTop: -10,
    },
    author: {
        marginTop: -20
    },

});

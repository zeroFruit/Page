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
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 94.8,
        height: 38.8
    },
    body: {
        marginTop: 30
    },
    btn: {
        width: 150,
        height: 38.3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 14.8,
        borderWidth: 0.8,
        borderColor: c.$borderColor,
        marginBottom: 7.3
    },
    darkbtn: {
        width: 150,
        height: 38.3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: c.$grayColor,
        borderRadius: 14.8,
        borderWidth: 0.8,
        borderColor: c.$borderColor,
        marginBottom: 7.3
    }
});

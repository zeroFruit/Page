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
        width: 80,
        height: 36.8
    },
    body: {
        marginTop: 29.3
    },
    btn: {
        width: 150,
        height: 38.3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 14.8,
        borderWidth: br.$light,
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
        borderWidth: br.$light,
        borderColor: c.$borderColor,
        marginBottom: 7.3
    }
});

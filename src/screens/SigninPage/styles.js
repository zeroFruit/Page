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
        width: 96,
        height: 39.3
    },
    body: {
        marginTop: 29.3,
        alignItems: 'center'
    },
    btn: {
        width: 114.8,
        height: 38,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 14.8,
        borderWidth: 0.8,
        borderColor: c.$borderColor,
        marginTop: 3,
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
    },
    textInput: {
        borderBottomWidth: .8,
        borderColor: c.$borderColor,
        marginBottom: 12.8,
        width: 188.3,
        fontSize: fs.$default,
        paddingVertical: 7.5
    },
    errContainer: {
        marginTop: -10,
    },
    errText: {
        fontSize: fs.$small,
        color: fc.$red
    }
});
